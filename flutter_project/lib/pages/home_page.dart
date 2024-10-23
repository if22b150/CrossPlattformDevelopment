import 'package:flutter/material.dart';
import 'package:flutter_project/widgets/home/locations_list.dart';
import 'package:modal_bottom_sheet/modal_bottom_sheet.dart';
import 'package:provider/provider.dart';
import '../providers/location_provider.dart';
import '../widgets/home/add_item.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final locationProvider = Provider.of<LocationProvider>(context);

    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showMaterialModalBottomSheet(
            context: context,
            backgroundColor: Colors.transparent,
            expand: true,
            builder: (BuildContext context) {
              return SafeArea(
                child: Container(
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.vertical(
                      top: Radius.circular(25.0), // Rounded top edges
                    ),
                  ),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                  child: AddItem(onSubmit: locationProvider.addLocation),
                ),
              );
            },
          );
        },
        child: const Icon(Icons.add),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(15),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "Map Locations",
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                  ],
                ),
                const SizedBox(height: 5),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    OutlinedButton(
                      onPressed: locationProvider.loading
                          ? null
                          : () => locationProvider.generateLocations(1000),
                      child: const Text("Generate locations"),
                    ),
                    OutlinedButton(
                      onPressed: locationProvider.locations.isEmpty
                          ? null
                          : locationProvider.deleteAllLocations,
                      child: const Text("Delete all locations"),
                    ),
                  ],
                ),
              ],
            ),
          ),
          Expanded(
            child: locationProvider.loadingLocations
                ? const Center(child: CircularProgressIndicator())
                : locationProvider.locations.isNotEmpty
                    ? LocationsList(locations: locationProvider.locations)
                    : Center(
                        child: Text(
                          'No locations available. Generate some!',
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                      ),
          ),
        ],
      ),
    );
  }
}
