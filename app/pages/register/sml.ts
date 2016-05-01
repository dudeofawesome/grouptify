export class SML {
    recommendation (tags, limit = 5) {

        //no duplicate elements sir!:
        tags = tags.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        });

        var length = tags.length;
        var counter = 0;
        var r_webdev = ['html','css','javascript','mysql','jquery'];
        var r_javascript = ['javascript','react','angular','mongodb','node','espresso'];
        var r_typescript = ['typescript','ionic2','angular2','cordova'];
        var r_soft = ['c++','java'];
        var r_soft2 = ['python','flask','django','scipy','numpy'];
        var r_ios = ['ios','swift','objective-c','c'];
        var r_android = ['android','java','ruby'];
        var r_microsoft = ['windows phone','c#','microsoft project oxford','bing'];
        var r_hardware = ['hardware','arduino','raspberry pi'];
        var r_bigdata = ['big data','hadoop','spark','machine learning'];

        while(counter < length)
        {
            switch(tags[counter])
            {	
                case 'typescript':
                case 'ionic2':
                    tags = tags.concat(r_typescript);
                break;
                case 'javascript':
                case 'react':
                case 'angular':
                case 'mongodb':
                case 'node':
                case 'espresso':
                    tags = tags.concat(r_javascript);
                break;
                case 'php':
                case 'html':
                case 'css' :
                case 'jquery' :
                    tags = tags.concat(r_webdev);
                break;
                case 'c':
                case 'c++':
                case 'java':
                    tags = tags.concat(r_soft);
                break;
                case 'python':
                case 'flask':
                case 'django':
                case 'spicy':
                case 'numpy':
                    tags = tags.concat(r_soft2);
                break;
                case 'swift':
                case 'objective-c':
                case 'ios':
                    tags = tags.concat(r_ios);
                break;
                case 'ruby':
                case 'android':
                case 'java':
                    tags = tags.concat(r_android);
                break;
                case 'windows phone':
                case 'c#':
                case 'microsoft project oxford':
                case 'bing':
                    tags = tags.concat(r_microsoft);
                break;
                case 'hardware':
                case 'arduino':
                case 'raspberry pi':
                    tags = tags.concat(r_hardware);
                break;
                case 'hadoop':
                case 'spark':
                case 'big data':
                case 'machine learning':
                    tags = tags.concat(r_bigdata);
                break;

            }
            counter++;
        }
        
        tags.splice(0,counter); //delete input tag
        //console.log(tags);

        var dict = {};
        var c2 = 0;	
        while(c2 < tags.length)
        {
            if(!dict[tags[c2]]){
                dict[tags[c2]]=0;
            }
            dict[tags[c2]]++;
            c2++;
        }
        var n_array = [];
        
        for(let i in dict) //let key in dictionary
        {
            n_array.push(i);
            if(n_array.length >= limit) break;
        }
        return n_array;
    }
}

// console.log(recommendation(['angular','react','javascript','java','css','shell','coffeescript'],4));    

