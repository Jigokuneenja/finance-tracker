import os
import jwt
import bcrypt
from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta

auth_bp = Blueprint('auth', __name__)

def get_credentials():
    username = os.getenv('APP_USERNAME')
    password = os.getenv('APP_PASSWORD')
    return username, password

def generate_token():
    payload = {
        'user': os.getenv('APP_USERNAME'),
        'exp': datetime.utcnow() + timedelta(days=30)
    }
    return jwt.encode(payload, os.getenv('JWT_SECRET'), algorithm='HS256')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    stored_username, stored_password = get_credentials()

    if username != stored_username or password != stored_password:\
        return jsonify({'error': 'Invalid credentials'}), 401
    
    token = generate_token()
    return jsonify({'token': token}), 200

@auth_bp.route('/verify', methods=['GET'])
def verify():
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    if not token:
        return jsonify({'error': 'No token'}), 401
    try:
        jwt.decode(token, os.getenv('JWT_SECRET'), algorithms=['HS256'])
        return jsonify({'valid': True}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401