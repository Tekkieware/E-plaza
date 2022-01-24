from django import urls
from django.urls import path
from base.views import order_views
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('', order_views.getOrders, name='orders'),
    path('add/', order_views.addOrderItems, name='order-add'),
    path('myorders/', order_views.getMyOrders, name='my-orders'),
    path('<str:pk>/deliver/', order_views.updateOrderToDelivered, name='deliver'),
    path('<str:pk>/', order_views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', order_views.updateOrderToPaid, name='pay'),
]
