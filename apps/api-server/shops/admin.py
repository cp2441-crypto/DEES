from django.contrib import admin
from .models import Shop, Dessert, Curation

@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    list_display = (
        'name', 
        'address', 
        'contact',
    )
    # 나중에 검색 기능을 넣을 때도 이렇게 정렬하면 편해요
    search_fields = ('name', 'address')

@admin.register(Dessert)
class DessertAdmin(admin.ModelAdmin):
    list_display = (
        'name', 
        'shop', 
        'category', 
        'sugar_content',
    )
    list_filter = ('category', 'is_gluten_free')

@admin.register(Curation)
class CurationAdmin(admin.ModelAdmin):
    list_display = (
        'title', 
        'published_at',
    )