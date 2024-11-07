import 'package:flutter/material.dart';
import 'package:flutter_project/providers/auth_provider.dart';
import 'package:flutter_project/widgets/scaffolds/main_scaffold.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:package_info_plus/package_info_plus.dart';

class LoginPage extends ConsumerStatefulWidget {
  const LoginPage({super.key});

  @override
  ConsumerState<LoginPage> createState() => LoginPageState();
}

class LoginPageState extends ConsumerState<LoginPage> {
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  String appName = 'Unknown';

  @override
  void initState() {
    super.initState();
    _getAppName();
  }

  Future<void> _getAppName() async {
    try {
      final PackageInfo packageInfo = await PackageInfo.fromPlatform();
      setState(() {
        appName = packageInfo.appName;
      });
      print("App name: ${packageInfo.appName}");
    } catch (e) {
      print("Error fetching app name: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    final authNotifier = ref.read(authProvider.notifier);

    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // App Icon
                const CircleAvatar(
                  radius: 50,
                  backgroundColor: Colors.transparent,
                  backgroundImage: AssetImage(
                    'lib/assets/images/logo.png',
                  ),
                ),
                const SizedBox(height: 20),
                // App Name
                Text(
                  appName,
                  style: Theme.of(context).textTheme.displaySmall,
                ),
                const SizedBox(height: 40),
                // Username Field
                TextField(
                  controller: usernameController,
                  decoration: const InputDecoration(
                    labelText: 'Username',
                    border: OutlineInputBorder(),
                    prefixIcon: Icon(Icons.person),
                  ),
                ),
                const SizedBox(height: 20),
                // Password Field
                TextField(
                  controller: passwordController,
                  obscureText: true,
                  decoration: const InputDecoration(
                    labelText: 'Password',
                    border: OutlineInputBorder(),
                    prefixIcon: Icon(Icons.lock),
                  ),
                ),
                const SizedBox(height: 40),
                // Login Button
                ElevatedButton(
                  onPressed: () async {
                    final username = usernameController.text;
                    final password = passwordController.text;

                    if (username.isEmpty || password.isEmpty) {
                      // Show error if username or password is empty
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content:
                              Text('Please enter both username and password'),
                          backgroundColor: Colors.red,
                        ),
                      );
                      return;
                    }

                    await authNotifier.login(username, password);

                    if (ref.read(authProvider).user != null) {
                      Navigator.of(context).pushReplacement(
                        MaterialPageRoute(
                            builder: (context) => const MainScaffold()),
                      );
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                            content: Text('Invalid username or password'),
                          backgroundColor: Colors.red,),
                      );
                    }
                  },
                  child: const Padding(
                    padding:
                        EdgeInsets.symmetric(horizontal: 40.0, vertical: 15.0),
                    child: Text(
                      'Login',
                      style: TextStyle(fontSize: 18),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
