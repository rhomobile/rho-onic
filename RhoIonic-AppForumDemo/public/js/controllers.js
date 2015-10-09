angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('TubesCtrl', function($scope,$state,$ionicModal,Tubes) {
  $scope.tubes = [];
  $scope.isLoading = true;
  $scope.dateRange = {
    from: '',
    to: '',
    selected: "today"
  };
  $scope.selectedTube = 0;

  $scope.tflStyle = Tubes.getStyles();



  $scope.setRange = function(range){
    $scope.dateRange.selected = range;
    switch (range){
      case 'today':
        $scope.dateRange.from = moment();
        $scope.dateRange.to = moment().endOf('day');
        break;
      case 'tomorrow':
        $scope.dateRange.from = moment().add(1,'d').startOf('day');
        $scope.dateRange.to = moment().add(1,'d').endOf('day');
        break;
      case 'weekend':
        $scope.dateRange.from = moment().day(6).startOf('day');
        $scope.dateRange.to = moment().day(7).endOf('day');
        break;
    };
    $scope.getStatus();
  }

  $scope.getStatus = function(){
    $scope.isLoading = true;
    Tubes.getStatus($scope.dateRange.from,$scope.dateRange.to).success(function(data){
      $scope.tubes=data;
      $scope.isLoading = false;
      // used for testing
      // $scope.tubes[2].lineStatuses[0].statusSeverityDescription = 'Delayed';
      // $scope.tubes[5].lineStatuses[0].statusSeverityDescription = 'Suspended';
    })
    .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });

  }

  $scope.showStatus = function(index){
    $scope.selectedTube = index;
    $scope.openModal();
  };

  $scope.getArrivals = function(index){
    $state.go('app.arrivals',{lineId: $scope.tubes[index].id});
  }

  $ionicModal.fromTemplateUrl('status-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
  $scope.setRange('today');
  
})

.controller('ArrivalsCtrl', function($scope, $stateParams, Tubes) {
  $scope.isLoading = true;
  $scope.lineName = "Arrivals";
  $scope.arrivals = [];
  $scope.getArrivals = function(){
    $scope.isLoading = true;
    Tubes.getArrivals($stateParams.lineId).success(function(data){
      $scope.isLoading = false;
      $scope.arrivals = data;
      $scope.lineName = $scope.arrivals[0].lineName;
    })
    .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });

  };

  $scope.getArrivals();
});
