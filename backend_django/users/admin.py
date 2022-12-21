from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea

from .models import User


class UserAdminConfig(UserAdmin):
    model = User
    search_fields = ('username', 'name', 'id')
    list_filter = ('username', 'name', 'is_active', 'is_staff')
    ordering = ('-start_date',)
    list_display = ('username', 'name',
                    'is_active', 'is_staff', 'id', )
    fieldsets = (
        (None, {'fields': ('username', 'name',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('Personal', {'fields': ('preferences',)}),
    )
    formfield_overrides = {
        User.preferences: {'widget': Textarea(attrs={'rows': 10, 'cols': 40})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'name', 'password1', 'password2', 'is_active', 'is_staff')}
         ),
    )


admin.site.register(User, UserAdminConfig)
