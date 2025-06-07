from django.db import models

from django.contrib.auth.models import User

# Create your models here.

class BaseModel(models.Model):
    
    createdAt = models.DateTimeField(auto_now_add = True, blank = True)
    updatedAt = models.DateTimeField(auto_now = True)
    isActive = models.BooleanField(default = True)

    class Meta:
        abstract = True


class Product(BaseModel):

    user = models.ForeignKey(User, on_delete = models.SET_NULL, null = True)
    name = models.CharField(max_length = 256, null = True, blank = True)
    image = models.ImageField(null= True, blank = True)
    brand = models.CharField(max_length = 200, null = True, blank = True)
    category = models.CharField(max_length = 256, null = True, blank = True)
    description = models.TextField(null = True, blank = True)
    rating = models.DecimalField(max_digits = 7, decimal_places = 2, null = True, blank = True)
    numReviews = models.IntegerField(null = True, blank = True, default = 0)
    price = models.DecimalField(max_digits = 9, decimal_places = 2, null = True, blank = True)
    countInStock = models.IntegerField(null = True, default = 0,blank = True)
    _id = models.AutoField(primary_key = True, editable = False, db_index = True)

    def __str__(self):
        return self.name
    


class Review(BaseModel):
    product = models.ForeignKey(Product, on_delete = models.SET_NULL, null = True)
    user = models.ForeignKey(User, on_delete = models.SET_NULL, null = True)
    name = models.CharField(max_length = 256, null = True, blank = True)
    rating = models.DecimalField(max_digits = 7, decimal_places = 2, null = True, blank = True)
    comment = models.TextField(max_length = 1024, null = True, blank = True)
    _id = models.AutoField(primary_key = True, editable = False)

    def __str__(self):
        return str(self.rating)





# orders  model
class Order(BaseModel):

    user = models.ForeignKey(User, on_delete = models.SET_NULL, null = True)
    paymentMethod = models.CharField(max_length = 50, null = True, blank = True)
    taxPrice = models.DecimalField(max_digits = 7, decimal_places = 2, null = True,blank = True)
    shippingPrice = models.DecimalField(max_digits = 7, decimal_places = 2, null = True, blank = True)
    totalPrice = models.DecimalField(max_digits = 7, decimal_places= 2, null = True, blank = True)
    isPaid = models.BooleanField(default = False, null = False)
    paidAt = models.DateTimeField(auto_now_add = False, null = True, blank = True)
    isDelivered = models.BooleanField(default = False)
    deliveredAt = models.DateTimeField(auto_now_add = False, null = True, blank = True)
    _id = models.AutoField(primary_key = True, editable = False)

    def __str__(self):
        return str(self.createdAt)
    

class OrderItem(BaseModel):
    product = models.ForeignKey(Product, on_delete = models.SET_NULL, null = True)
    order = models.ForeignKey(Order, on_delete = models.SET_NULL, null = True)
    name = models.CharField(max_length  =200, null = True, blank = True)
    qty = models.IntegerField(null = True, blank = True, default = 0)
    price = models.DecimalField(max_digits = 9, decimal_places = 2, null = True, blank = True)
    image = models.CharField(max_length = 256, null = True, blank = True)
    _id = models.AutoField(primary_key = True, editable = False)

    def __str__(self):
        return str(self.name)
    
class ShippingAddress(BaseModel):
    order = models.OneToOneField(Order, on_delete = models.CASCADE, null = True, blank = True)
    address = models.CharField(max_length = 512, null = False, blank = False)
    city = models.CharField(max_length = 64, null = True, blank = True)
    postalCode = models.CharField(max_length = 10, null = True, blank = True)
    country  = models.CharField(max_length=128, null = True, blank = True)
    shipping_price = models.DecimalField(max_digits = 7, decimal_places = 2, null = True, blank = True)
    _id = models.AutoField(primary_key = True, editable = False)

    def __str__(self):
        return str(self.address)
