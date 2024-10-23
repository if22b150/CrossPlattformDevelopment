import 'dart:math';
import 'dart:ui';

import 'package:flutter/material.dart';

import '../enums/category_enum.dart';

class Location {
  final String name;
  final double latitude;
  final double longitude;
  final Category category;

  Location({
    required this.name,
    required this.latitude,
    required this.longitude,
    required this.category
  });

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'latitude': latitude,
      'longitude': longitude,
      'category': category.toString().split('.').last, // Save category as a string
    };
  }

  factory Location.fromJson(Map<String, dynamic> json) {
    return Location(
      name: json['name'],
      latitude: json['latitude'],
      longitude: json['longitude'],
      category: Category.values.firstWhere(
            (e) => e.toString().split('.').last == json['category'],
        orElse: () => Category.other, // Default to 'other' if not found
      ),
    );
  }
}

class LocationUtils {
  static List<Location> generateSampleLocations(int count, [int startIndex = 1]) {
    final Random random = Random();
    final List<Location> locations = [];

    for (int i = 0; i < count; i++) {
      String name = 'Location ${startIndex + i}';
      double latitude = _randomLatitude(random);
      double longitude = _randomLongitude(random);
      Category category = _randomCategory(random);

      locations.add(Location(name: name, latitude: latitude, longitude: longitude, category: category));
    }

    return locations;
  }

  static double _randomLatitude(Random random) {
    return -90 + random.nextDouble() * 180; // Latitude between -90 and 90
  }

  static double _randomLongitude(Random random) {
    return -180 + random.nextDouble() * 360; // Longitude between -180 and 180
  }

  static Category _randomCategory(Random random) {
    return Category.values[random.nextInt(Category.values.length)];
  }

  static Color getCategoryColor(Category category) {
    switch (category) {
      case Category.restaurant:
        return Colors.brown;
      case Category.park:
        return Colors.green;
      case Category.hotel:
        return Colors.blue;
      case Category.shop:
        return Colors.yellow;
      default:
        return Colors.grey;
    }
  }
}
