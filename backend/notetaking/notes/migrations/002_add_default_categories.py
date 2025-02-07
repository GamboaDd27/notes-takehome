from django.db import migrations

def create_default_categories(apps, schema_editor):
    Category = apps.get_model('notes', 'Category')
    default_categories = ["Random Thoughts", "School", "Personal"]
    for cat in default_categories:
        Category.objects.get_or_create(name=cat)

class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_default_categories),
    ]
