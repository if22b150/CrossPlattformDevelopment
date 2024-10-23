import 'package:flutter/material.dart';

import '../../enums/category_enum.dart';

class AddItem extends StatefulWidget {
  const AddItem({super.key, required this.onSubmit});

  final void Function(String name, double latitude, double longitude, Category category) onSubmit;

  @override
  State<AddItem> createState() => _AddItemState();
}

class _AddItemState extends State<AddItem> {
  final _formKey = GlobalKey<FormState>();
  String _name = '';
  double _latitude = 0.0;
  double _longitude = 0.0;
  Category? _selectedCategory = Category.restaurant;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Form(
        key: _formKey,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextFormField(
              decoration: const InputDecoration(labelText: 'Name'),
              onSaved: (value) {
                _name = value ?? '';
              },
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter a name';
                }
                return null;
              },
            ),
            TextFormField(
              decoration: const InputDecoration(labelText: 'Latitude'),
              keyboardType: TextInputType.number,
              onSaved: (value) {
                _latitude = double.tryParse(value ?? '0.0') ?? 0.0;
              },
              validator: (value) {
                if (value == null || double.tryParse(value) == null) {
                  return 'Please enter a valid latitude';
                }
                return null;
              },
            ),
            TextFormField(
              decoration: const InputDecoration(labelText: 'Longitude'),
              keyboardType: TextInputType.number,
              onSaved: (value) {
                _longitude = double.tryParse(value ?? '0.0') ?? 0.0;
              },
              validator: (value) {
                if (value == null || double.tryParse(value) == null) {
                  return 'Please enter a valid longitude';
                }
                return null;
              },
            ),
            DropdownButtonFormField<Category>(
              value: _selectedCategory,
              decoration: const InputDecoration(labelText: 'Category'),
              items: Category.values
                  .map((category) => DropdownMenuItem(
                value: category,
                child: Text(category.toString().split('.').last),
              ))
                  .toList(),
              onChanged: (value) {
                setState(() {
                  _selectedCategory = value;
                });
              },
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                if (_formKey.currentState?.validate() ?? false) {
                  _formKey.currentState?.save();
                  widget.onSubmit(_name, _latitude, _longitude, _selectedCategory!);
                  Navigator.pop(context);
                }
              },
              child: const Text('Add Location'),
            ),
          ],
        ),
      ),
    );
  }
}
