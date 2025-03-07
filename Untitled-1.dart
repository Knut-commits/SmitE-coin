/*
import 'package:flutter/material.dart';

void main() {
  runApp(const FitnessApp());
}

class FitnessApp extends StatelessWidget {
  const FitnessApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fitness App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const FitnessHomePage(),
    );
  }
}

class FitnessHomePage extends StatefulWidget {
  const FitnessHomePage({super.key});

  @override
  _FitnessHomePageState createState() => _FitnessHomePageState();
}

class _FitnessHomePageState extends State<FitnessHomePage> {
  int _selectedIndex = 0;

  static final List<Widget> _pages = <Widget>[
    DashboardPage(),
    WorkoutsPage(),
    ProfilePage(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Fitness App')),
      body: _pages.elementAt(_selectedIndex),
      bottomNavigationBar: BottomNavigationBar(
        items: const [
          BottomNavigationBarItem(
              icon: Icon(Icons.dashboard), label: 'Dashboard'),
          BottomNavigationBarItem(
              icon: Icon(Icons.fitness_center), label: 'Workouts'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.blueAccent,
        onTap: _onItemTapped,
      ),
    );
  }
}

class DashboardPage extends StatelessWidget {
  const DashboardPage({super.key});

  // This method displays a pop-up dialog using showDialog.
  void _showPopup(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Hello!"),
          content: const Text("This is your fitness pop-up dialog."),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Closes the dialog.
              },
              child: const Text("Close"),
            )
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ElevatedButton(
        onPressed: () => _showPopup(context),
        child: const Text("Show Pop-Up"),
      ),
    );
  }
}

class WorkoutsPage extends StatelessWidget {
  const WorkoutsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        ListTile(
          leading: const Icon(Icons.directions_run),
          title: const Text('Running'),
          subtitle: const Text('30 minutes, 300 calories'),
          trailing: const Icon(Icons.arrow_forward_ios),
          onTap: () {
            // You can add navigation to a detailed page here.
          },
        ),
        ListTile(
          leading: const Icon(Icons.fitness_center),
          title: const Text('Strength Training'),
          subtitle: const Text('45 minutes, 400 calories'),
          trailing: const Icon(Icons.arrow_forward_ios),
          onTap: () {
            // You can add navigation to a detailed page here.
          },
        ),
        ListTile(
          leading: const Icon(Icons.pool),
          title: const Text('Swimming'),
          subtitle: const Text('30 minutes, 350 calories'),
          trailing: const Icon(Icons.arrow_forward_ios),
          onTap: () {
            // You can add navigation to a detailed page here.
          },
        ),
      ],
    );
  }
}

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        'User Profile',
        style: TextStyle(fontSize: 24),
      ),
    );
  }
}
