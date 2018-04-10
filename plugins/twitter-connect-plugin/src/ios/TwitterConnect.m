
#import <Foundation/Foundation.h>
#import "TwitterConnect.h"
#import <Fabric/Fabric.h>
#import <TwitterKit/TwitterKit.h>
#import "ListTimelineViewController.h"

@implementation TwitterConnect

- (void)pluginInitialize
{
    NSString* consumerKey = [self.commandDelegate.settings objectForKey:[@"TwitterConsumerKey" lowercaseString]];
    NSString* consumerSecret = [self.commandDelegate.settings objectForKey:[@"TwitterConsumerSecret" lowercaseString]];
    [[Twitter sharedInstance] startWithConsumerKey:consumerKey consumerSecret:consumerSecret];
    [Fabric with:@[[Twitter sharedInstance]]];
    
    [Fabric with:@[TwitterKit]];
}


- (void)login:(CDVInvokedUrlCommand*)command
{
    [[Twitter sharedInstance] logInWithCompletion:^(TWTRSession *session, NSError *error) {
		CDVPluginResult* pluginResult = nil;
		if (session){
			NSLog(@"signed in as %@", [session userName]);
			NSDictionary *userSession = @{
										  @"userName": [session userName],
										  @"userId": [session userID],
										  @"secret": [session authTokenSecret],
										  @"token" : [session authToken]};
			pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:userSession];
		} else {
			NSLog(@"error: %@", [error localizedDescription]);
			pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
		}
		[self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
	}];
}

- (void)logout:(CDVInvokedUrlCommand*)command
{
    [[Twitter sharedInstance] logOut];
	CDVPluginResult* pluginResult = pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
	[self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)showUser:(CDVInvokedUrlCommand*)command
{
	TWTRAPIClient *apiClient = [[Twitter sharedInstance] APIClient];

	NSDictionary *requestParameters = [NSDictionary dictionaryWithObjectsAndKeys:[[[Twitter sharedInstance] session] userName], @"screen_name", nil];
	NSError *error = nil;
	NSURLRequest *apiRequest = [apiClient URLRequestWithMethod:@"GET"
														   URL:@"https://api.twitter.com/1.1/users/show.json"
													parameters:requestParameters
														 error:&error];
	[apiClient sendTwitterRequest:apiRequest
					   completion:^(NSURLResponse *response, NSData *data, NSError *error) {
						   NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *)response;
						   NSInteger _httpStatus = [httpResponse statusCode];

						   CDVPluginResult *pluginResult = nil;
						   NSLog(@"API Response :%@",response);
						   if (error != nil) {
							   pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
						   } else if (_httpStatus == 200) {
							   NSDictionary *resultDict = [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];
							   pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
						   }
						   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

					   }];
}

- (void)openComposer:(CDVInvokedUrlCommand*)command
{
	CDVPluginResult* pluginResult = nil;
    NSString* unescapedText = [command.arguments objectAtIndex:0];

    //check if it has default text parameter
    if (unescapedText == nil) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Should receive a default text as input parameter!"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }

	UIApplication *application = [UIApplication sharedApplication];
	NSString *escapedText = [unescapedText stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
	NSString *schemeUrl = @"twitter://post?message=";
	NSString *schemeString = [schemeUrl stringByAppendingString:escapedText];
	NSURL *URL = [NSURL URLWithString:schemeString];

	if ([application respondsToSelector:@selector(openURL:options:completionHandler:)]) {
		//call twitter app if it can
    	[application openURL:URL options:@{} completionHandler:^(BOOL success) {
      		if(!success) {
      			//open native composer
      			//this happens when the twitter app was previously installed on the device
  				TWTRComposer *composer = [[TWTRComposer alloc] init];

				NSString *text = unescapedText;
				[composer setText:text];

				// Called from a UIViewController
				UIViewController *vc = self.viewController;
				[composer showFromViewController:vc completion:nil];
      		} else {
      			NSLog(@"Open %d",success);
      		}
    	}];
  	} else {
  		//else open native composer
  		TWTRComposer *composer = [[TWTRComposer alloc] init];

		NSString *text = unescapedText;
		[composer setText:text];

		// Called from a UIViewController
		UIViewController *vc = self.viewController;
		[composer showFromViewController:vc completion:nil];
  	}
}

- (void)showTimeline:(CDVInvokedUrlCommand*)command
{
	CDVPluginResult* pluginResult = nil;
    NSString* query = [command.arguments objectAtIndex:0];

    //check if it has query parameter
    if (query == nil) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Should receive a query as input parameter!"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }

	ListTimelineViewController *lvc = [[ListTimelineViewController alloc] init];
	lvc.query = query;
	UIViewController *vc = self.viewController;
    [vc presentViewController:lvc animated:NO completion:nil];

}

@end
