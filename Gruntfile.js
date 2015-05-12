module.exports = function (grunt) {
	
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),

		uglify: { // https://github.com/gruntjs/grunt-contrib-uglify
			dev: {
				options: {
					banner: '/* Groupon Search <%= pkg.author %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
					compress: false, // removes unused code
					sourceMap: false, // creates source map
					beautify: true, // prettifies code
					mangle: false, // changes variable and function names
					preserveComments: true
				},
				files: {
					'js/calypso-search-bootstrap.min.js': [ 
						'jscript/MapEngine.js', 
						'jscript/DealEngine.js', 
						'jscript/UIEngine-calypso.js', 
						'jscript/UIEngine-search.js', 
						'jscript/header.js', 
						'jscript/vendor/bootstrap.custom.js', 
						'jscript/vendor/jquery.nanoscroller.js', 
						'jscript/vendor/plugins.js', 
						'jscript/vendor/optimize-suite.js'
					],
					'js/calypso-search-local-bootstrap.min.js': [ 
						'jscript/MapEngine.js', 
						'jscript/DealEngine.js', 
						'jscript/UIEngine-calypso.js', 
						'jscript/UIEngine-search.js', 
						'jscript/UIEngine-local',
						'jscript/header.js', 
						'jscript/vendor/bootstrap.custom.js',
						'jscript/vendor/jquery.nanoscroller.js', 
						'jscript/vendor/plugins.js', 
						'jscript/vendor/optimize-suite.js'
					]
				}
			},
			prod: {
				options: {
					banner: '/* Groupon Search <%= pkg.author %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
					compress: true, // removes unused code
					sourceMap: true, // creates source map
					beautify: false, // prettifies code
					mangle: true, // changes variable and function names
					preserveComments: false
				},
				files: {
					'js/calypso-search-bootstrap.min.js': [ 
						'jscript/MapEngine.js', 
						'jscript/DealEngine.js', 
						'jscript/UIEngine-calypso.js', 
						'jscript/UIEngine-search.js', 
						'jscript/header.js', 
						'jscript/vendor/bootstrap.custom.js', 
						'jscript/vendor/jquery.nanoscroller.js', 
						'jscript/vendor/plugins.js', 
						'jscript/vendor/optimize-suite.js'
					],
					'js/calypso-search-local-bootstrap.min.js': [ 
						'jscript/MapEngine.js', 
						'jscript/DealEngine.js', 
						'jscript/UIEngine-calypso.js', 
						'jscript/UIEngine-search.js', 
						'jscript/UIEngine-local',
						'jscript/header.js', 
						'jscript/vendor/bootstrap.custom.js',
						'jscript/vendor/jquery.nanoscroller.js', 
						'jscript/vendor/plugins.js', 
						'jscript/vendor/optimize-suite.js'
					]
				}
			}
		},

		compass:{ //https://github.com/gruntjs/grunt-contrib-compass
			dev:{
				options: {
					sassDir: ['sass'],
					cssDir: ['css'],
					environment: 'development',
					outputStyle: 'expanded',
					relativeAssets: true,
					sourcemap: false,
					force: true
				}
			},
			prod:{
				options: {
					//banner: '/* Groupon Search <%= pkg.author %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
					sassDir: ['sass'],
					cssDir: ['css'],
					environment: 'production',
					outputStyle: 'compressed',
					relativeAssets: true,
					sourcemap: true,
					force: true
				}
			}
		},

		watch: { // https://github.com/gruntjs/grunt-contrib-watch
			/*scripts: {
				files: ['scripts/*.js'],
				tasks: ['uglify:dev']
			},*/
			compass:{
				files: ['sass/*.{scss,sass}'],
				tasks: ['compass:dev']
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default',['watch']);
	grunt.registerTask('prod', ['compass:prod','uglify:prod', 's3']);
};
