from django import urls
from django.urls import path
from base.views import product_views
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('', product_views.getProducts, name='products'),
    path('create/', product_views.createProduct, name='product-create'),
    path('upload/', product_views.uploadImage, name='image-upload'),
    path('<str:pk>/reviews/', product_views.createProductReview, name='create-review'),
    path('top/', product_views.getTopProducts, name='top-products'),
    path('<str:pk>/', product_views.getProduct, name='product'),
    path('delete/<str:pk>/', product_views.deleteProduct, name='product-delete'),
    path('update/<str:pk>/', product_views.updateProduct, name='product-update'),

]
