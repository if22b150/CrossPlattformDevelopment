import 'package:flutter/material.dart';
import 'package:flutter_project/models/location_model.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart'; // Import Google Maps
import 'package:geolocator/geolocator.dart';
import 'package:provider/provider.dart';
import '../providers/location_provider.dart';

class MapPage extends StatefulWidget {
  const MapPage({super.key});

  @override
  State<MapPage> createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> {
  GoogleMapController? _googleMapController;
  LatLng? _currentLocation;
  final Set<Marker> _markers = {};
  late LocationPermission _locationPermissionStatus;

  @override
  void initState() {
    super.initState();
    _checkAndRequestLocationPermission(); // Request location permission at startup
  }

  // Check location permission status and request permission if not denied forever
  Future<void> _checkAndRequestLocationPermission() async {
    LocationPermission permission = await Geolocator.checkPermission();
    _locationPermissionStatus = permission;

    if (permission == LocationPermission.denied) {
      await _requestLocationPermission(); // Request permission if denied
    } else if (permission == LocationPermission.always ||
        permission == LocationPermission.whileInUse) {
      _getCurrentLocation(); // Permission is already granted, get location
      _listenForLocationUpdates();
    }
  }

  // Request location permissions
  Future<void> _requestLocationPermission() async {
    LocationPermission permission = await Geolocator.requestPermission();
    setState(() {
      _locationPermissionStatus = permission;
    });

    if (permission == LocationPermission.always ||
        permission == LocationPermission.whileInUse) {
      _getCurrentLocation(); // Get location if permission is granted
      _listenForLocationUpdates();
    }
  }

  // Open app settings if location permission is denied forever
  Future<void> _openAppSettings() async {
    await Geolocator.openAppSettings();
  }

  // Show a confirmation dialog before opening app settings
  Future<void> _showOpenSettingsDialog() async {
    bool openSettings = await showDialog<bool>(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: const Text("Location Permission Required"),
              content: const Text(
                  "Location permission is permanently denied. Do you want to open the app settings to enable location access?"),
              actions: <Widget>[
                TextButton(
                  onPressed: () {
                    Navigator.of(context)
                        .pop(false); // Close dialog without opening settings
                  },
                  child: const Text("Cancel"),
                ),
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop(
                        true); // Return true to indicate settings should be opened
                  },
                  child: const Text("Open Settings"),
                ),
              ],
            );
          },
        ) ??
        false;

    if (openSettings) {
      _openAppSettings(); // Open settings if the user agreed
    }
  }

  // Get initial current location
  Future<void> _getCurrentLocation() async {
    try {
      Position position = await Geolocator.getCurrentPosition();
      setState(() {
        _currentLocation = LatLng(position.latitude, position.longitude);
        _addCurrentLocationMarker(); // Add current location marker
      });
      _goToCurrentLocation();
    } catch (e) {
      print("Error getting location: $e");
    }
  }

  // Add a marker for the current location
  void _addCurrentLocationMarker() {
    if (_currentLocation != null) {
      _markers.add(
        Marker(
          markerId: const MarkerId("current_location"),
          position: _currentLocation!,
          infoWindow: const InfoWindow(
            title: "You are here",
          ),
          icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueRed),
        ),
      );
    }
  }

  // Listen for location updates
  void _listenForLocationUpdates() {
    Geolocator.getPositionStream(
      locationSettings: const LocationSettings(
        accuracy: LocationAccuracy.high,
        distanceFilter: 10, // Update every 10 meters
      ),
    ).listen((Position position) {
      setState(() {
        _currentLocation = LatLng(position.latitude, position.longitude);
        _addCurrentLocationMarker(); // Update current location marker
      });
      _goToCurrentLocation();

      // Optionally animate the map to the new location
      _googleMapController?.animateCamera(
        CameraUpdate.newLatLng(_currentLocation!),
      );
    });
  }

  // Add markers for saved locations
  void _addSavedLocationMarkers(List<Location> savedLocations) {
    for (var location in savedLocations) {
      _markers.add(
        Marker(
          markerId: MarkerId(location.name),
          position: LatLng(location.latitude, location.longitude),
          infoWindow: InfoWindow(
            title: location.name,
            snippet: location.category.name, // Show category in the marker
          ),
          icon: BitmapDescriptor.defaultMarkerWithHue(_colorToMarkerHue(
              LocationUtils.getCategoryColor(location.category))),
        ),
      );
    }
  }

  // Convert color to a marker hue value
  double _colorToMarkerHue(Color color) {
    // Convert the color to HSV and use its hue value
    HSVColor hsvColor = HSVColor.fromColor(color);
    return hsvColor.hue;
  }

  // Handle FloatingActionButton click based on permission status
  void _handleFloatingActionButton() {
    if (_locationPermissionStatus == LocationPermission.denied) {
      _requestLocationPermission(); // Request permission if denied
    } else if (_locationPermissionStatus == LocationPermission.deniedForever) {
      _showOpenSettingsDialog(); // Ask user if they want to open app settings
    } else {
      _goToCurrentLocation(); // Move to current location if permission is granted
    }
  }

  // Move the camera to the current location
  void _goToCurrentLocation() {
    if (_currentLocation != null) {
      _googleMapController?.animateCamera(
        CameraUpdate.newLatLngZoom(_currentLocation!, 14.0),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final locationProvider = Provider.of<LocationProvider>(context);
    final savedLocations = locationProvider.locations;

    if (savedLocations.isNotEmpty) {
      _addSavedLocationMarkers(savedLocations);
    }

    return Scaffold(
      body: GoogleMap(
        mapType: MapType.normal,
        initialCameraPosition: CameraPosition(
          target: _currentLocation ?? const LatLng(48.2082, 16.3738),
          // Default location if no current location
          zoom: 14.0,
        ),
        markers: _markers, // Add all the markers
        onMapCreated: (GoogleMapController controller) {
          _googleMapController = controller;
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _handleFloatingActionButton,
        // Handle FAB press based on permission status
        child: const Icon(Icons.my_location),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.startFloat,
    );
  }

  @override
  void dispose() {
    _googleMapController?.dispose();
    super.dispose();
  }
}
