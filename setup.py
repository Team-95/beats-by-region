from setuptools import setup, find_packages

with open('requirements.txt') as f:
    requirements = f.read().splitlines()

readme = ''
with open('README.md') as f:
    readme = f.read()

setup(name='Video Locale',
      author='Team 95',
      url='https://github.com/Team-95/videolocale',
      packages=find_packages(),
      license='MIT',
      description='A website that generates YouTube playlists based on selected geographical regions.',
      long_description=readme,
      include_package_data=True,
      install_requires=requirements,
      classifiers=[
        'Development Status :: 1 - Planning',
        'Environment :: Web Environment',
        'Framework :: Flask',
        'Intended Audience :: End Users/Desktop',
        'License :: OSI Approved :: MIT License',
        'Natural Language :: English',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Topic :: Internet',
        'Topic :: Multimedia :: Video :: Display'
      ]
)
