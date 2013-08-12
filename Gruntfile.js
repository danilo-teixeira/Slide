module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	uglify: {
		options: {
			banner: '/*! <%= pkg.name %>, v<%= pkg.version %> - (<%= grunt.template.today("yyyy-mm-dd") %>), license: <%= pkg.license.type %> - see <%= pkg.license.url %>, author: <%= pkg.author.name %> */\n'
		},
		build: {
			src: 'src/<%= pkg.name %>.jquery.js',
			dest: 'dist/<%= pkg.name %>.jquery.min.js'
		}
	},
	concat: {
		options: {
			stripBanners: true,
			banner: '/**\n'+
				' * <%= pkg.name %>, v<%= pkg.version %> - (<%= grunt.template.today("yyyy-mm-dd") %>) \n'+ 
				' * license: <%= pkg.license.type %> - see <%= pkg.license.url %> \n'+ 
				' * author: <%= pkg.author.name %> \n'+
				' */\n'
			},
			dist: {
				src: [ 'src/<%= pkg.name %>.js', 'src/lib/jquery.easing.min.js' ],
				dest: 'src/<%= pkg.name %>.jquery.js'
			},
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Default task(s).
	grunt.registerTask('default', [ 'concat', 'uglify' ]);

};