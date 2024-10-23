import 'package:flutter/material.dart';
import 'package:package_info_plus/package_info_plus.dart';

class AboutPage extends StatefulWidget {
  const AboutPage({super.key});

  @override
  State<AboutPage> createState() => _AboutPageState();
}

class _AboutPageState extends State<AboutPage> {
  String appVersion = 'Unknown';

  @override
  void initState() {
    super.initState();
    _getAppVersion();
  }

  Future<void> _getAppVersion() async {
    try {
      final PackageInfo packageInfo = await PackageInfo.fromPlatform();
      setState(() {
        appVersion = packageInfo.version;
      });
      print("App version: ${packageInfo.version}");
    } catch (e) {
      print("Error fetching app version: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(15),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "App Information",
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                const Icon(Icons.info, size: 24, color: Colors.blue),
                const SizedBox(width: 10),
                Text(
                  "Version $appVersion",
                  style: const TextStyle(fontSize: 18),
                ),
              ],
            ),
            const Divider(height: 30),

            const Text(
              "Developer Information",
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 20),

            // Profile image
            const Center(
              child: CircleAvatar(
                radius: 50,
                backgroundImage: AssetImage(
                  'lib/assets/images/developer.png',
                ),
              ),
            ),
            const SizedBox(height: 20),

            // Developer Name
            const Center(
              child: Text(
                "Developer Name",
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(height: 5),

            const Center(
              child: Text(
                "Software Engineer",
                style: TextStyle(
                  fontSize: 18,
                  color: Colors.grey,
                ),
              ),
            ),
            const SizedBox(height: 20),

            // Skills
            const Text(
              "Skills",
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 10),
            const Wrap(
              spacing: 8.0, // Horizontal space between chips
              children: [
                SkillChip(skill: "Flutter"),
                SkillChip(skill: "Dart"),
                SkillChip(skill: "Google Maps API"),
                SkillChip(skill: "Firebase"),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class SkillChip extends StatelessWidget {
  final String skill;

  const SkillChip({super.key, required this.skill});

  @override
  Widget build(BuildContext context) {
    return Chip(
      label: Text(skill),
      labelStyle: const TextStyle(color: Colors.black),
    );
  }
}
