import * as constants from '../actions/constants';

const initialState = {
  searchTerm: '',
  results: [ {"id":"ARiDTqpiA-xubd0792u95A","name":"Lily's Vegetarian Indian Cuisine","photos":["https://s3-media2.fl.yelpcdn.com/bphoto/dmAr-9Y_4FDuefw8xzYQsw/o.jpg"],"reviews":[{"text":"It's just as good as everyone says! A really nice woman came over to advise us enthusiastically on the menu and we really enjoyed her recommendations of...","rating":5,"time_created":"2016-02-13 04:40:55","url":"https://www.yelp.com/biz/lilys-vegetarian-indian-cuisine-ashton-under-lyne?hrid=6Yf3WcnR7EjCLytzOWxnSA&adjust_creative=sxNjiVmafHW-22BVYEKiaw&utm_campaign=yelp_api_v3&utm_medium=api_v3_graphql&utm_source=sxNjiVmafHW-22BVYEKiaw","user":{"name":"Natalie W."}},{"text":"This was my first time here and it was a great experience the staff were really friendly and help full.\n\nThe place was so busy but we just about managed to...","rating":5,"time_created":"2015-09-01 05:48:05","url":"https://www.yelp.com/biz/lilys-vegetarian-indian-cuisine-ashton-under-lyne?hrid=ClCDUVnmlP_3dRlv2kULYA&adjust_creative=sxNjiVmafHW-22BVYEKiaw&utm_campaign=yelp_api_v3&utm_medium=api_v3_graphql&utm_source=sxNjiVmafHW-22BVYEKiaw","user":{"name":"Holly N."}},{"text":"I come from India a country where being a vegetarian means you're pampered for choice. Given the variety of herbs and spices we have there the sheer...","rating":5,"time_created":"2014-12-01 06:58:20","url":"https://www.yelp.com/biz/lilys-vegetarian-indian-cuisine-ashton-under-lyne?hrid=m9KCdJ3zirgFfc47TCw8kA&adjust_creative=sxNjiVmafHW-22BVYEKiaw&utm_campaign=yelp_api_v3&utm_medium=api_v3_graphql&utm_source=sxNjiVmafHW-22BVYEKiaw","user":{"name":"Raam S."}}]}
,{"id":"72Xxw4Cdv4Qvdf4XaaVV8w","name":"Ash Tree Farm","photos":["https://s3-media1.fl.yelpcdn.com/bphoto/0sPvveD6XE7ITdtkrMaWYg/o.jpg"],"reviews":[{"text":"Good food, always really busy though. Definitely recommend the breakfast. Really good cavery too.","rating":4,"time_created":"2018-01-05 15:33:14","url":"https://www.yelp.com/biz/ash-tree-farm-ashton-under-lyne?hrid=pq_ZOWazpZEgPjBahSgYzA&adjust_creative=sxNjiVmafHW-22BVYEKiaw&utm_campaign=yelp_api_v3&utm_medium=api_v3_graphql&utm_source=sxNjiVmafHW-22BVYEKiaw","user":{"name":"Jenny W."}},{"text":"This place had a massive hype so we decided to go and check it out.. Disappointed doesn't even come close. \n\nThe food wasn't bad.. But it wasn't good...","rating":2,"time_created":"2015-05-04 10:04:39","url":"https://www.yelp.com/biz/ash-tree-farm-ashton-under-lyne?hrid=ZksmzvflYebyR_K48D8uOA&adjust_creative=sxNjiVmafHW-22BVYEKiaw&utm_campaign=yelp_api_v3&utm_medium=api_v3_graphql&utm_source=sxNjiVmafHW-22BVYEKiaw","user":{"name":"Emma H."}},{"text":"Lovely carvary and especially the cake. I got an eclair and it was that big i couldn't eat it all. But they kindly boxed it up for me so i could take it...","rating":4,"time_created":"2015-06-08 09:40:26","url":"https://www.yelp.com/biz/ash-tree-farm-ashton-under-lyne?hrid=3aZZdJ1rqWXPkCzAfJnKgw&adjust_creative=sxNjiVmafHW-22BVYEKiaw&utm_campaign=yelp_api_v3&utm_medium=api_v3_graphql&utm_source=sxNjiVmafHW-22BVYEKiaw","user":{"name":"Zoe N."}}]}
]
}

function updateResults(results, changed) {
  const changedMap = changed.reduce((acc, curr) =>
    (acc[curr.id] = curr) && acc, {});

  return results.map(item =>
    changedMap[item.id] ? { ...item, ...changedMap[item.id] } : item);
}

export default function (state = initialState, action) {
  switch (action.type) {
    case constants.REPLACE_LOCATIONS:
      return { ...state, results: action.payload.results, searchTerm: action.payload.searchTerm };
    case constants.UPDATE_LOCATIONS:
      return { ...state, results: updateResults(state.results, action.payload.results) };
    default:
      return state;
  }
}