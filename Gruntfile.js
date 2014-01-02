module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		requirejs: {
			compile: {
				options: {
					baseUrl: '',
					mainConfigFile: '',
					out: ''
				}
			}
		},

		sass: {
			dist: {

				options: {
					compass: true,
				},

				files: [{
					expand: true,
					cwd: 'styles',
					src: [ '*.scss' ],
					dest: 'web/pub',
					ext: '.css'
				}]

			}
		},

		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},

		manifest: {
			generate: {

				options: {
					basePath: '',
					timestamp: true,
					
					cache: [
						//
					],
					
					network: [
						'http://*',
						'https://*',
						'ws://*'
					],

					fallback: [
						'/ offline.html'
					]

				},

				src: {
					'web/pub/*.js'
					'web/pub/*.css'
				},

				dest: {
					'web/pub/cache.manifest'
				}

			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-manifest');

	grunt.registerTask('default', [
		'requirejs',
		'sass',
		'manifest'
	]);

};
