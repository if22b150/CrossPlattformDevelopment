import 'package:flutter/material.dart';
import 'package:flutter_project/models/location_model.dart';

class LocationsList extends StatelessWidget {
  const LocationsList({super.key, required this.locations});

  final List<Location> locations;

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      itemCount: locations.length,
      itemBuilder: (context, index) {
        final location = locations[index];
        return ListTile(
          title: Text(location.name),
          subtitle: Text(
              'Lat: ${location.latitude}, Lng: ${location.longitude}'),
          trailing: Container(
            padding: const EdgeInsets.symmetric(vertical: 4.0, horizontal: 8.0),
            decoration: BoxDecoration(
              color: LocationUtils.getCategoryColor(location.category), // Set color based on category
              borderRadius: BorderRadius.circular(12.0),
            ),
            child: Text(
              location.category.toString().split('.').last.toUpperCase(),
              style: const TextStyle(color: Colors.white),
            ),
          ),
        );
      },
      separatorBuilder: (BuildContext context, int index) =>
      const Divider(),
    );
  }
}
