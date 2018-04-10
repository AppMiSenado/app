
#import "ListTimelineViewController.h"

@implementation ListTimelineViewController

- (void)viewDidLoad {
  [super viewDidLoad];

  TWTRAPIClient *apiClient = [[Twitter sharedInstance] APIClient];
  self.dataSource = [[TWTRSearchTimelineDataSource alloc] initWithSearchQuery:_query APIClient:apiClient];

  self.refreshControl = nil;
}

@end