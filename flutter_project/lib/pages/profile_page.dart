import 'package:flutter/material.dart';
import 'package:flutter_project/pages/login_page.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../providers/auth_provider.dart';

class ProfilePage extends ConsumerWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authNotifier = ref.read(authProvider.notifier);
    final authState = ref.watch(authProvider);

    return Scaffold(
      body: Center(
        child: ElevatedButton(
            onPressed: () async {
              await authNotifier.logout();

              Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (context) => const LoginPage()),
              );
            },
            child: const Padding(
              padding: EdgeInsets.symmetric(horizontal: 40.0, vertical: 15.0),
              child: Text(
                'Logout',
                style: TextStyle(fontSize: 18),
              ),
            )
        ),
      ),
    );
  }
}
