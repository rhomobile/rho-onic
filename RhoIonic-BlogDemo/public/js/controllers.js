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

.controller('UsersCtrl', function($scope,$http) {
  $scope.loading = true;
  $scope.users = [];
  $http.get('https://randomuser.me/api/?results=500&nat=us').
  success(function(data, status, headers, config) {
    $scope.users = data.results;
    $scope.loading=false;
  }).
  error(function(data, status, headers, config) {
  });

})
.controller('DatePickerCtrl', function($scope, $stateParams) {
  $scope.currentDate = new Date();
  $scope.title = "Custom Title";

  $scope.datePickerCallback = function (val) {
      if(typeof(val)==='undefined'){      
          console.log('Date not selected');
      }else{
          console.log('Selected date is : ', val);
      }
  };
})
.controller('ProfileCtrl', function($scope, $stateParams,$zebraBarcodeScanner) {
  $scope.dataUriModel = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iNjAwLjAwMDA2IgogICBoZWlnaHQ9IjYwMCIKICAgaWQ9InN2ZzIiCiAgIHZlcnNpb249IjEuMSIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMC40OC40IHI5OTM5IgogICBzb2RpcG9kaTpkb2NuYW1lPSJQcm9maWxlUGxhY2Vob2xkZXJTdWl0LnN2ZyIKICAgaW5rc2NhcGU6ZXhwb3J0LWZpbGVuYW1lPSIvaG9tZS9uYXVnaHQxMDEvRG9jdW1lbnRzL2FydC9Qcm9maWxlUGxhY2Vob2xkZXJTdWl0LnBuZyIKICAgaW5rc2NhcGU6ZXhwb3J0LXhkcGk9IjMwIgogICBpbmtzY2FwZTpleHBvcnQteWRwaT0iMzAiPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM0IiAvPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0iYmFzZSIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMS4wIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp6b29tPSIwLjciCiAgICAgaW5rc2NhcGU6Y3g9IjYxNy4yMTEyNSIKICAgICBpbmtzY2FwZTpjeT0iMzI3LjQ1ODQ4IgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTYwMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI4NTQiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii0yIgogICAgIGlua3NjYXBlOndpbmRvdy15PSItMyIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGZpdC1tYXJnaW4tdG9wPSIwIgogICAgIGZpdC1tYXJnaW4tbGVmdD0iMCIKICAgICBmaXQtbWFyZ2luLXJpZ2h0PSIwIgogICAgIGZpdC1tYXJnaW4tYm90dG9tPSIwIiAvPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTciPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03NDMuMjAxNTUsOTcuNTY2MzU0KSI+CiAgICA8cGF0aAogICAgICAgc3R5bGU9Im9wYWNpdHk6MC41O2ZpbGw6Izk5OTk5OTtzdHJva2U6bm9uZSIKICAgICAgIGQ9Im0gMTAyNi41MTg0LC0zNC4wNDM4NTQgYyAtMTQuOTExMywxLjI3MTk5IC0zMC40NTU2NCw0Ljc1NjYxNSAtNDIuOTk1OTEsMTIuOTI0MTE1IC0xMC45NzIxNiw3LjE0NjI0OSAtMTkuMjMzMzcsMTguMzY3NjM5MSAtMjUuNTUyMjksMjkuODM2Mjc5MSAtNC42OTAxMiw4LjUxMjQ2ODkgLTYuOTkyNDIsMTguMjc2NDYyOSAtOC41ODc4MywyNy44NjM2NDk5IC0yLjUyNDU0LDE1LjE3MDQ1OSAtMS40MjIyOCw0Ni4xMTUzNTMgLTEuNDIyMjgsNDYuMTE1MzUzIGwgLTUuNDA2MTcsOC44Njk0OTEgYyAtMS4zNjMzOCwxMC43Mjg1NjYgMC4zNzk1MSwyMS4xMTU3ODYgMC43NzMwMSwzMS44NDQzNDYgMC4zMDY2Niw4LjM2MTk2IDEuMjQ0OTgsMTYuNzIzOTQgMi45Njc3MywyNS4wODU5MSBsIDguNTA3NjEsOS45NzEwNSBjIDAsMCAxLjk3ODk3LDExLjg1MTY2IDUuNDYxMDYsMjAuMDU1MzEgMy40ODIwNiw4LjIwMzYzIDE3LjA5Mjc5LDI2Ljk5NTIyIDE3LjA5Mjc5LDI2Ljk5NTIyIC0xMi41MzcwNCw0LjMzNTE4IC0zMS4xNTQ2LDguMDQ4OTcgLTM3LjU4OTc2LDEzLjAwODU5IC00LjY3Mjg0LDMuNjAxNCAtNS43NjIyOSwxMC42MjUxNSAtOC4xOTM3MiwxNi4zODc0NSBsIC0xMTUuMzAzMzgsMjEuMTE3ODMgLTE0LjM2MDEyLDIxLjIwMjMxIDAsMzAuNjYzMSAtNTguNzA3NTksMTk0LjUzNzQ4IDYwMC4wMDAwNSwyZS01IC0xOC40MTQ5LC02Mi4wODY0NCAtMjIuNTUzOCwtMTI2LjI4NDY1IC0xLjM1MTUsLTI1LjI1Njk0IC04Ljg2OTYsLTE1LjAzNTkgLTQ2LjM3NDcsLTE3LjA2MzIxIC02Ni4yMjU1LC0xMS41NzI1OCBjIC03LjA2NzUsLTcuMjkyNyAtMTUuOTk5OSwtMTcuNDMwMiAtMjEuMjAyMywtMjEuODc4MDcgLTUuMTg5MSwtNC40MzY0MyAtMjguNjY0LC0xMC45MjQ5NyAtNDIuOTk1OSwtMTYuMzg3NDQgbCAtMi43MDMxLC05LjU0NTI3IGMgMCwwIDcuNjY4MiwtOS4yNTI4MSAxMC4yMjEsLTE2LjM4NzQzIDIuNTUyOCwtNy4xMzQ2MyAzLjM3ODgsLTI1LjkzMjcxIDMuMzc4OCwtMjUuOTMyNzEgbCA0LjgxNDksMS4zNTE1NSA0LjgxNDksLTcuNTE3OTYgMi4wMjczLC0yNy4yODQyNCBjIDAsMCAwLjM5NjksLTMyLjM0MDMzMiAtMS4zNTE1LC0zNi4xNTM3MzQgLTEuNzQ4NSwtMy44MTM0MDEgLTUuNDkwNywtNC44MTQ4NjcgLTUuNDkwNywtNC44MTQ4NjcgMCwwIDAuOTk3MiwtMjkuNTYzODA4IC0yLjcwMzEsLTQzLjY3MTY4NCAtMy44NDk5LC0xNC42NzgzMzYgLTEwLjQyNDksLTI5LjA3NjE3MjEgLTE5Ljg1MDcsLTQwLjk2ODYwMjEgLTcuNzI4MywtOS43NTA2MTQ5IC0xNy41MzQ2LC0xOC42NTE1NDI5IC0yOC45ODYyLC0yMy41MTYwMzc5IC0xNi4zNDA1LC02Ljk0MTMyOCAtMzUuMTc3MSwtNy45ODAyNTggLTUyLjg2NjYsLTYuNDcxMjg5IHogbSAtNDcuMTM1LDI1MS44OTM1NDQgMTAuODk2ODEsMTkuNzY2MyAzOC45NDEyOSwzMi43NzQ4OCAxOS4wOTA1LDEuMzUxNTQgNDQuNDMxOSwtMjMuOTA1MzkgMTkuNzY2NCwtMjcuMjg0MjQgLTIuMDI3NCwxMC4yMjEwMyAtMjMuOTA1Myw2OC45Mjg2MiAtMTkuODUwOCw2NC44NzM5OCAtMTIuOTI0MSw1OS4zODMzNiAtMTMuMDA4Niw3Mi4zOTE5NCAtMzIuMDE0NiwtMTkzLjE4NTk2IC0xOS4xNzUwMSwtNDAuMjkyODMgeiBtIDg0LjY0OTMsMTQ1LjM2NTgzIC0xNi4zODMyLDgxLjkxNTc3IC02LjgyNjMsNDkuNTI0NDQgLTIyLjgzNDksLTE1NC4xMTY4MyA3Ljg1NDMsLTIwLjczNzM1IDIwLjE4MywtMi4wMDEwMSAtMTkuMTk2NCwtMC4zMjEzNCAtMTIuMzE3LC0yNS42MDY1MiAtNi42MjYsNS4yOTgyMyAxNy45MTkxLC0yMy4zODAxMyAyNC41NzQ3LDEuMzY1MjcgMjYuOTYzOSwzMS43NDIzNiAtMTUuNjQ2NiwtMTMuMDUwODQgLTE0LjczMDUsMjMuNjMxNjMgMTYuMzgzMiwzNC44MTQyMiB6IgogICAgICAgaWQ9InBhdGgyOTk2IgogICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0ic3Nzc2Njc2NjemNzY2NjY2NjY2NjY2Njc2NjemNjY2N6Y3Nzc3NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2MiIC8+CiAgPC9nPgo8L3N2Zz4K";
  $scope.barcode = "Scan";
  $scope.takePicture = function(){
    Rho.Camera.takePicture({
      outputFormat: Rho.Camera.OUTPUT_FORMAT_DATAURI
      },
      function(resp){
          $scope.dataUriModel = resp.imageUri;
          $scope.$apply();
    });
  }

  $scope.scanBarcode = function(){
    $zebraBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        // Success! Barcode data is here
        $scope.barcode = barcodeData;
      }, function(error) {
        // An error occurred
        alert(error)
      });
  }

});
