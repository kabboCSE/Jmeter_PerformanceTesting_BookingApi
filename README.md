<h1> Jmeter_PerformanceTesting_BookingApi </h1>

I’ve completed performance test on frequently used API for test App https://restful-booker.herokuapp.com. 
Test executed for the below mentioned scenario in server https://restful-booker.herokuapp.com/. 

- 400 Concurrent Request with 1 Loop Count; Avg TPS for Total Samples is ~ 47 And Total Concurrent API requested: 2800.
- 800 Concurrent Request with 10 Loop Count; Avg TPS for Total Samples is ~ 864 And Total Concurrent API requested: 56000.
- 900 Concurrent Request with 1 Loop Count; Avg TPS for Total Samples is ~ 53 And Total Concurrent API requested: 6300.
- 950 Concurrent Request with 1 Loop Count; Avg TPS for Total Samples is ~ 10 And Total Concurrent API requested: 6650.
- 1000 Concurrent Request with 1 Loop Count; Avg TPS for Total Samples is ~ 54 And Total Concurrent API requested: 7000.

#### While executed 1000 concurrent request, found  51 request got connection timeout and error rate is 0.23%. 

## Summary: Server can handle almost concurrent 950 API call with almost zero (0) error rate.
