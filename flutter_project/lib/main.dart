import 'package:flutter/material.dart';
import 'package:flutter_project/pages/login_page.dart';
import 'package:flutter_project/providers/auth_provider.dart';
import 'package:flutter_project/widgets/scaffolds/main_scaffold.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() {
  runApp(
    const ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const EntryPage(),
    );
  }
}

class EntryPage extends ConsumerWidget {
  const EntryPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);

    // Show loading spinner while user data is loading
    if (authState.loading) {
      return const Scaffold(
        body: Center(
            child: Column(
          children: [
            CircleAvatar(
              radius: 50,
              backgroundColor: Colors.transparent,
              backgroundImage: AssetImage(
                'lib/assets/images/logo.png',
              ),
            ),
            SizedBox(
              height: 20,
            ),
            CircularProgressIndicator()
          ],
        )),
      );
    }

    // Check if the user is logged in or not
    return authState.user != null ? const MainScaffold() : const LoginPage();
  }
}
