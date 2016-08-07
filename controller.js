    app.controller('mainController', function($scope) {// create the controller and inject Angular's $scope
       
    });
    app.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
		alert(window.localStorage['storageName']);
		$scope.hello = function() {
				alert('hello');
		};
    });
	
	app.controller('customersCtrl', function($scope, $http) {
    
});


	app.controller('requestviewController', function($scope,$http) {
		$scope.SendData = function () {
		    // use $.param jQuery function to serialize data from JSON 
		    $scope.message = "called ";
		    var req = { 'requesterName': $scope.requesterName, 'approversName': $scope.approversName, 'requestersTeamName': $scope.requestersTeamName, 'domain': $scope.domain, 'requestDescription': $scope.requestDescription,'requestStatus': 'pending' };
		    var data = req;
        
		    var config = {
		        headers : {
		            //'Content-Type': 'application/x-www-form-urlencoded',
		            //'Access-Control-Allow-Origin':'*'
		            'cache-control': 'no-cache',
		            'content-type': 'application/json'
		        },
		        json:true
            }
$scope.message = "sending";
     $http.post('http://localhost:8088/addRequest', data, config)
            .success(function (data, status, headers, config) {
                $scope.message = "Request raised sucessfully";
				
            })
            .error(function (data, status, header, config) {
				
                   $scope.message = "Request raised failed";
            });
        };


		 
 });
	


	
	app.controller('requestlistController', function($scope,$http,$filter,NgTableParams) {

		var self = this;
 	    $scope.requests=[];		
		$http.get("http://localhost:8088/requests")
		.then(function (response) {
		$scope.requests = response.data.requests;

		$scope.requestsTable = new NgTableParams({
                page: 1,
                count: 5
            }, {
                total: $scope.requests.length, 
                getData: function ( params) {
				   $scope.data = params.sorting() ? $filter('orderBy')($scope.requests, params.orderBy()) : $scope.requests;  
				   $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
				   $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
				   
                }
            });
		
		},function (err) {
		$scope.message = err;
	});

	$scope.refreshData=function(){
		$http.get("http://localhost:8088/requests")
		.then(function (response) {
		$scope.requests = response.data.requests;
		$scope.requestsTable = new NgTableParams({
                page: 1,
                count: 10
            }, {
                total: $scope.requests.length, 
                getData: function ( params) {
				   $scope.data = params.sorting() ? $filter('orderBy')($scope.requests, params.orderBy()) : $scope.requests;  
				   $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
				   $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                }
            });
		
		},function (err) {
		$scope.message = err;
	});
	};
	
	$scope.approveRequest = function (id) {
		//data.requestStatus = 'Approved';
		
        console.log('controller');
		console.log(id);
		var data = { 'id': id };
		var config = {
			headers : {
				//'Content-Type': 'application/x-www-form-urlencoded',
				//'Access-Control-Allow-Origin':'*'
				'cache-control': 'no-cache',
				'content-type': 'application/json'
			},
			json: true
		}
		$scope.message = "sending";
		$http.post('http://localhost:8088/approveRequest', data, config)
            .success(function (data, status, headers, config) {
			$http.get("http://localhost:8088/requests")
			$scope.refreshData();

				
			
		})
            .error(function (data, status, header, config) {
			
			$scope.message = "data is  not posted sucessfully";
		});

		
	};
	$scope.rejectRequest= function (id) {
		//data.requestStatus = 'Approved';
	
		console.log('controller');
		console.log(id);
		var data = { 'id': id };
		var config = {
			headers : {
				//'Content-Type': 'application/x-www-form-urlencoded',
				//'Access-Control-Allow-Origin':'*'
				'cache-control': 'no-cache',
				'content-type': 'application/json'
			},
			json: true
		}
		$scope.message = "sending";
		$http.post('http://localhost:8088/rejectRequest', data, config)
            .success(function (data, status, headers, config) {
			 $scope.refreshData();
		})
            .error(function (data, status, header, config) {
			
			$scope.message = "data is  not posted sucessfully";
		});
	};

		
    });
	

    app.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });
	
