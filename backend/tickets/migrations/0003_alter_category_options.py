# Generated by Django 5.1.4 on 2024-12-30 01:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tickets', '0002_ticket_approved_by_ticket_created_at_ticket_number_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name_plural': 'categories'},
        ),
    ]
