from django.contrib import admin

from account.models import Account
from profile.admin import ProfileInline
from django.contrib.auth.admin import UserAdmin


'''
AccountAdmin is a class that is represented for the Admin users of this
platform.
'''


class AccountAdmin(UserAdmin):
    # represents the fields of the account which can be edited
    # i.e. In Personal info, the fields 'first_name' and 'last_name' of Account
    # object can be edited
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (('Personal info'), {'fields': ('first_name', 'last_name')}),
        (('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                      'groups', 'user_permissions')}),
        (('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    # extra fields to the account view is added
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    # Controls which fields are displayed on the change list page of the admin
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    # Enables a search box on the admin change list page. Meaning these field names
    # will be searched whenever somebody submits a search query.
    search_fields = ('email', 'first_name', 'last_name')
    # The order of the accounts in the admin page will be in alphabetical order of
    # emails
    ordering = ['email']

    inlines = [ProfileInline]


# Admin AccountAdmin as the representation of Account for the admin page
admin.site.register(Account, AccountAdmin)
