from flask import Blueprint, jsonify
from database import get_connection
from middleware import require_auth

summary_bp = Blueprint('summary', __name__)

@summary_bp.route('/summary', methods=['GET'])
@require_auth
def get_summary():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute('''
        SELECT category, SUM(amount) as total
        FROM transactions
        GROUP BY category
    ''')
    category_rows = cursor.fetchall()

    cursor.execute('''
        SELECT SUM(amount) as total
        FROM transactions
        WHERE category != 'income'
    ''')
    expense_row = cursor.fetchone()

    cursor.execute('''
        SELECT SUM(amount) as total
        FROM transactions
        WHERE category = 'income'
    ''')
    income_row = cursor.fetchone()

    conn.close()

    categories = {}
    for row in category_rows:
        categories[row['category']] = round(row['total'], 2)
    
    total_expenses = round(expense_row['total'] or 0, 2)
    total_income = round(income_row['total'] or 0, 2)
    balance = round(total_income - total_expenses, 2)

    return jsonify({
        'total_income': total_income,
        'total_expenses': total_expenses,
        'balance': balance,
        'by_category': categories
    })