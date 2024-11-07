import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_project/providers/location_provider.dart';
import 'package:flutter_project/widgets/home/locations_list.dart';
import 'package:modal_bottom_sheet/modal_bottom_sheet.dart';
import '../widgets/home/add_item.dart';

class HomePage extends ConsumerWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locationState = ref.watch(locationProvider);
    final locationNotifier = ref.read(locationProvider.notifier);

    void showSnackBar(String message, Color bgColor) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(message), backgroundColor: bgColor,),
      );
    }

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
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                  child: AddItem(onSubmit: (name, lat, lng, category) async {
                    final result = await locationNotifier.addLocation(name, lat, lng, category);
                    if (result != null) showSnackBar(result, Colors.green);
                  }),
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
                      onPressed: locationState.loading
                          ? null
                          : () async {
                        final result = await locationNotifier.generateLocations(1000);
                        if (result != null) showSnackBar(result, Colors.green);
                      },
                      child: const Text("Generate locations"),
                    ),
                    OutlinedButton(
                      onPressed: locationState.locations.isEmpty
                          ? null
                          : () async {
                        final result = await locationNotifier.deleteAllLocations();
                        if (result != null) showSnackBar(result, Colors.green);
                      },
                      child: const Text("Delete all locations"),
                    ),
                  ],
                ),
              ],
            ),
          ),
          Expanded(
            child: locationState.loadingLocations
                ? const Center(child: CircularProgressIndicator())
                : locationState.locations.isNotEmpty
                ? LocationsList(locations: locationState.locations)
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
