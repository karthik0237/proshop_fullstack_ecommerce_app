from django.urls import path

from baseapp.views import order_views

urlpatterns = [
    path('add/', order_views.add_order_items, name = 'add_orders'),
    path('myorders/', order_views.get_my_orders, name='my_orders'),

    path('<str:pk>/', order_views.get_order_by_id, name='user_order'),
    path('<str:pk>/pay', order_views.update_order_to_paid, name='pay')
]