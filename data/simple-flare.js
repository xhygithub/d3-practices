
var data1 = {
 "name": "flare",
 // "number":800,
 // "duration": 60,
 "children": [
  {
   "name": "analytics",
   "number": 500,
   "duration": 41,
   "children": [
    {
     "name": "cluster",
     "number": 50,
     "duration": 1,
     "children": [
      {"name": "AgglomerativeCluster", "number": 80,"duration": 11,"size": 3938},
      {"name": "CommunityStructure", "number": 100,"duration": 11,"size": 3812},
      {"name": "MergeEdge", "number": 200,"duration": 1, "size": 743}
     ]
    },
    {
     "name": "graph",
     "number": 100,
     "duration": 6,
     "children": [
      {"name": "BetweennessCentrality", "number": 200,"duration": 41,"size": 3534},
      {"name": "LinkDistance", "number": 200, "duration": 1,"size": 5731}
     ]
    },
    {
     "name": "optimization",
     "number": 150,
     "duration": 0.1,
     "children": [
      {"name": "AspectRatioBanker", "number": 200, "duration": 0.1,"size": 7074}
     ]
    }
   ]
  },
  {
   "name": "animate",
   "number": 300,
   "duration": 5,
   "children": [
    {"name": "Easing", "number": 200, "duration": 11,"size": 17010},
    {"name": "FunctionSequence", "number": 200, "duration": 26,"size": 5842},
    {
     "name": "interpolate",
     "number": 200,
     "duration": 1,
     "children": [
      {"name": "ArrayInterpolator", "number": 200, "duration": 25,"size": 1983},
      {"name": "ColorInterpolator", "number": 300, "duration": 0.1,"size": 2047},
      {"name": "DateInterpolator", "number": 70, "duration": 31,"size": 1375},
      {"name": "Interpolator", "number": 20, "duration": 11,"size": 8746},
      {"name": "MatrixInterpolator", "number": 200, "duration": 0.1,"size": 2202},
      {"name": "NumberInterpolator", "number": 200, "duration": 7,"size": 1382},
      {"name": "ObjectInterpolator", "number": 200, "duration": 0.1,"size": 1629},
      {"name": "PointInterpolator", "number": 200, "duration": 5,"size": 1675},
      {"name": "RectangleInterpolator", "number": 2, "duration": 0.1, "size": 2042}
     ]
    },
    {"name": "ISchedulable", "number": 80, "duration": 1, "size": 1041},
    {"name": "ISchedulable", "number": 80, "duration": 10.1, "children":[{"name": "Parallel", "number": 20,"duration": 0.1,"size": 5176},{"name": "Parallel", "number": 20,"duration": 0.1,"size": 5176}]},
    {"name": "Parallel", "number": 20,"duration": 0.1,"size": 5176},
    {"name": "Pause", "number": 100,"duration": 11,"size": 449},
    {"name": "Scheduler", "number": 200,"duration": 51,"size": 5593},
    {"name": "Sequence", "number": 20,"duration": 31,"size": 5534},
    {"name": "Transition", "number": 200,"duration": 1,"size": 9201},
    {"name": "Transitioner", "number": 2,"duration": 21,"size": 19975},
    {"name": "TransitionEvent", "number": 10,"duration": 21,"size": 1116},
    {"name": "Tween", "number": 2,"duration": 11,"size": 6006}
   ]
  }
 ]
};


var data2 ={
 "name": "flare",
 // "number":800,
 // "duration": 60,
 "children": [
  {
   "name": "analytics",
   "number": 300,
   "duration": 41,
   "children": [
    {
     "name": "cluster",
     "number": 50,
     "duration": 1,
     "children": [
      {"name": "AgglomerativeCluster", "number": 80,"duration": 11,"size": 3938},
      {"name": "CommunityStructure", "number": 100,"duration": 11,"size": 3812},
      {"name": "MergeEdge", "number": 200,"duration": 1, "size": 743}
     ]
    },
    {
     "name": "graph",
     "number": 100,
     "duration": 6,
     "children": [
      {"name": "BetweennessCentrality", "number": 200,"duration": 41,"size": 3534},
      {"name": "LinkDistance", "number": 200, "duration": 1,"size": 5731}
     ]
    },
    {
     "name": "optimization",
     "number": 150,
     "duration": 51,
     "children": [
      {"name": "AspectRatioBanker", "number": 200, "duration": 0.1,"size": 7074}
     ]
    }
   ]
  },
  {
   "name": "animate",
   "number": 500,
   "duration": 5,
   "children": [
    {"name": "Easing", "number": 200, "duration": 11,"size": 17010},
    {"name": "FunctionSequence", "number": 200, "duration": 26,"size": 5842},
    {
     "name": "interpolate",
     "number": 200,
     "duration": 1,
     "children": [
      {"name": "ArrayInterpolator", "number": 200, "duration": 25,"size": 1983},
      {"name": "ColorInterpolator", "number": 300, "duration": 0.1,"size": 2047},
      {"name": "DateInterpolator", "number": 70, "duration": 31,"size": 1375},
      {"name": "Interpolator", "number": 20, "duration": 11,"size": 8746},
      {"name": "MatrixInterpolator", "number": 200, "duration": 0.1,"size": 2202},
      {"name": "NumberInterpolator", "number": 200, "duration": 7,"size": 1382},
      {"name": "ObjectInterpolator", "number": 200, "duration": 0.1,"size": 1629},
      {"name": "PointInterpolator", "number": 200, "duration": 5,"size": 1675},
      {"name": "RectangleInterpolator", "number": 2, "duration": 0.1, "size": 2042}
     ]
    },
    {"name": "ISchedulable", "number": 80, "duration": 1, "size": 1041},
    {"name": "ISchedulable", "number": 80, "duration": 10.1, "children":[{"name": "Parallel", "number": 20,"duration": 0.1,"size": 5176},{"name": "Parallel", "number": 20,"duration": 0.1,"size": 5176}]},
    {"name": "Parallel", "number": 20,"duration": 0.1,"size": 5176},
    {"name": "Pause", "number": 100,"duration": 11,"size": 449},
    {"name": "Scheduler", "number": 200,"duration": 51,"size": 5593},
    {"name": "Sequence", "number": 20,"duration": 31,"size": 5534},
    {"name": "Transition", "number": 200,"duration": 1,"size": 9201},
    {"name": "Transitioner", "number": 2,"duration": 21,"size": 19975},
    {"name": "TransitionEvent", "number": 10,"duration": 21,"size": 1116},
    {"name": "Tween", "number": 2,"duration": 11,"size": 6006}
   ]
  }
 ]
};
