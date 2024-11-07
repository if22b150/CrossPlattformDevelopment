import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user_model.dart';

class AuthState {
  final User? user;
  final bool loading;

  AuthState({required this.user, required this.loading});
}

class AuthProvider extends StateNotifier<AuthState> {
  AuthProvider() : super(AuthState(user: null, loading: true)) {
    _loadUser();
  }

  Future<void> _loadUser() async {
    state = AuthState(user: state.user, loading: true);

    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? userString = prefs.getString('user');

    if (userString != null) {
      dynamic userJson = jsonDecode(userString);
      User user = User.fromJson(userJson);
      state = AuthState(user: user, loading: false);
    } else {
      state = AuthState(user: null, loading: false);
    }
  }

  Future<void> _saveUser() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String userString = jsonEncode(state.user?.toJson());
    await prefs.setString('user', userString);
  }

  Future<void> login(String username, String password) async {
    User user = User(username: username, password: password);
    state = AuthState(user: user, loading: false);
    await _saveUser();
  }

  Future<void> logout() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove('user');
    state = AuthState(user: null, loading: false);
  }
}

final authProvider = StateNotifierProvider<AuthProvider, AuthState>((ref) {
  return AuthProvider();
});
