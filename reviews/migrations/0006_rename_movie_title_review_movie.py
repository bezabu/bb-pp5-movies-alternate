# Generated by Django 5.0.6 on 2024-06-27 17:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0005_alter_review_rating'),
    ]

    operations = [
        migrations.RenameField(
            model_name='review',
            old_name='movie_title',
            new_name='movie',
        ),
    ]
