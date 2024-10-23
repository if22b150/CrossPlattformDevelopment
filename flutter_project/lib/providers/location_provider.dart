import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../enums/category_enum.dart';
import '../models/location_model.dart';

class LocationProvider with ChangeNotifier {
  List<Location> _locations = [];
  bool _loading = false;
  bool _loadingLocations = true;

  List<Location> get locations => _locations;
  bool get loading => _loading;
  bool get loadingLocations => _loadingLocations;

  LocationProvider() {
    _loadLocations(); // Load locations when provider is initialized
  }

  // Load locations from local storage
  Future<void> _loadLocations() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? locationsString = prefs.getString('locations');

    if (locationsString != null) {
      List<dynamic> locationJson = jsonDecode(locationsString);
      _locations = locationJson.map((data) => Location.fromJson(data)).toList();
    }

    _loadingLocations = false;
    notifyListeners(); // Notify listeners when locations are loaded
  }

  // Save locations to local storage
  Future<void> _saveLocations() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String locationsString = jsonEncode(
        _locations.map((location) => location.toJson()).toList());
    await prefs.setString('locations', locationsString);
  }

  // Generate and add locations to the existing list
  void generateLocations(int count) {
    _loading = true;
    notifyListeners();

    List<Location> generatedLocations = LocationUtils.generateSampleLocations(
        count, _locations.length + 1);
    _locations.addAll(generatedLocations);

    _saveLocations().then((_) {
      _loading = false;
      notifyListeners();
    });
  }

  // Add a new location
  void addLocation(String name, double latitude, double longitude, Category category) {
    _locations.add(Location(
      name: name,
      latitude: latitude,
      longitude: longitude,
      category: category,
    ));
    _saveLocations();
    notifyListeners();
  }

  // Clear all locations from local storage
  Future<void> deleteAllLocations() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove('locations');
    _locations = [];
    notifyListeners();
  }
}
