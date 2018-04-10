package com.manifestwebdesign.twitterconnect;

import com.twitter.sdk.android.tweetui.TweetTimelineListAdapter;
import com.twitter.sdk.android.tweetui.SearchTimeline;

import android.os.Bundle;

import android.app.ListActivity;

public class TimelineListActivity extends ListActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {

    	Bundle recdData = getIntent().getExtras();
		String query = recdData.getString("query");
		int resourceId = recdData.getInt("resourceid");

        super.onCreate(savedInstanceState);
        setContentView(resourceId);

        SearchTimeline searchTimeline = new SearchTimeline.Builder().query(query).build();
        final TweetTimelineListAdapter adapter = new TweetTimelineListAdapter(this, searchTimeline);
        setListAdapter(adapter);
    }
}