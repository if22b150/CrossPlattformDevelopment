import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../enums/category_enum.dart';
import '../models/location_model.dart';

class LocationState {
  final List<Location> locations;
  final bool loading;
  final bool loadingLocations;

  LocationState({
    required this.locations,
    required this.loading,
    required this.loadingLocations,
  });

  LocationState copyWith({
    List<Location>? locations,
    bool? loading,
    bool? loadingLocations,
  }) {
    return LocationState(
      locations: locations ?? this.locations,
      loading: loading ?? this.loading,
      loadingLocations: loadingLocations ?? this.loadingLocations,
    );
  }
}

class LocationNotifier extends StateNotifier<LocationState> {
  LocationNotifier() : super(LocationState(locations: [], loading: false, loadingLocations: true)) {
    _loadLocations(); // Load locations when provider is initialized
  }

  // Load locations from local storage
  Future<void> _loadLocations() async {
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      String? locationsString = prefs.getString('locations');

      if (locationsString != null) {
        List<dynamic> locationJson = jsonDecode(locationsString);
        List<Location> loadedLocations = locationJson.map((data) => Location.fromJson(data)).toList();
        state = state.copyWith(locations: loadedLocations, loadingLocations: false);
      } else {
        state = state.copyWith(loadingLocations: false);
      }
    } catch (e) {
      print("Error loading locations: $e");
      state = state.copyWith(loadingLocations: false);
    }
  }

  // Save locations to local storage
  Future<void> _saveLocations() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String locationsString = jsonEncode(state.locations.map((location) => location.toJson()).toList());
    await prefs.setString('locations', locationsString);
  }

  // Generate and add locations to the existing list
  Future<String?> generateLocations(int count) async {
    state = state.copyWith(loading: true);

    try {
      List<Location> generatedLocations =
      LocationUtils.generateSampleLocations(count, state.locations.length + 1);
      state = state.copyWith(
        locations: [...state.locations, ...generatedLocations],
        loading: false,
      );

      await _saveLocations();
      return "Successfully generated $count locations.";
    } catch (e) {
      state = state.copyWith(loading: false);
      return "Failed to generate locations: $e";
    }
  }

  // Add a new location
  Future<String?> addLocation(String name, double latitude, double longitude, Category category) async {
    try {
      Location newLocation = Location(
        name: name,
        latitude: latitude,
        longitude: longitude,
        category: category,
      );
      state = state.copyWith(locations: [...state.locations, newLocation]);
      await _saveLocations();
      return "Location '$name' saved successfully.";
    } catch (e) {
      return "Failed to save location '$name': $e";
    }
  }

  // Clear all locations from local storage
  Future<String?> deleteAllLocations() async {
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.remove('locations');
      state = state.copyWith(locations: []);
      return "All locations deleted successfully.";
    } catch (e) {
      return "Failed to delete locations: $e";
    }
  }
}

// Create a provider for the LocationNotifier
final locationProvider = StateNotifierProvider<LocationNotifier, LocationState>((ref) {
  return LocationNotifier();
});
