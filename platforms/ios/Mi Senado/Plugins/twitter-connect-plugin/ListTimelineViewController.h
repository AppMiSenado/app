#import <UIKit/UIKit.h>
#import <TwitterKit/TwitterKit.h>

@interface ListTimelineViewController : TWTRTimelineViewController

@property (nonatomic, copy) NSString* query;

@end