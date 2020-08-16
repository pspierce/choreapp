import Jasmine from 'jasmine'

const jasmine = new Jasmine();
jasmine.loadConfigFile('tests/unit/jasmine.json');
jasmine.execute();