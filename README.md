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

# Without Error for 800 Request: ********

#### Test and report information:
![image](https://github.com/kabboCSE/Jmeter_PerformanceTesting_BookingApi/assets/123986919/bd7ede38-d452-4d16-87ff-4b50e85b974e)

#### Summary Report:
![image](https://github.com/kabboCSE/Jmeter_PerformanceTesting_BookingApi/assets/123986919/2e507430-3102-454a-8bb6-dfb2e88f5ee7)

#### Statistics:
![image](https://github.com/kabboCSE/Jmeter_PerformanceTesting_BookingApi/assets/123986919/e90551ef-c6d2-4076-a7fd-9246bec301a6)

#### Errors:
![image](https://github.com/kabboCSE/Jmeter_PerformanceTesting_BookingApi/assets/123986919/c329e3fc-6b87-4af0-8bd7-e9f426d4f986)


#### Total transaction per second

![image](https://github.com/kabboCSE/Jmeter_PerformanceTesting_BookingApi/assets/123986919/f8f56b2b-c994-4ccc-b25a-6381c456415d)


# With Error for 1000 request: ********

#### Test and report information:
![image](https://github.com/kabboCSE/Jmeter_PerformanceTesting_BookingApi/assets/123986919/d47cbcb4-cadb-446d-8f19-7fdb366d79e1)

#### Summary Report:
![image](https://github.com/kabboCSE/Jmeter_PerformanceTesting_BookingApi/assets/123986919/74034e80-52ea-4dd8-bbe5-f52d8a9325b8)

#### Statistics:
![image](https://github.com/kabboCSE/Jmeter_PerformanceTesting_BookingApi/assets/123986919/5d28f540-ee3c-4a5a-8c75-77a4b4d8d46e)

#### Errors:
![image](https://github.com/kabboCSE/Jmeter_PerformanceTesting_BookingApi/assets/123986919/e3cfa39f-2085-496e-8ed4-6baed1fe2e1d)

#### Total transaction per second
![image](https://github.com/kabboCSE/Jmeter_PerformanceTesting_BookingApi/assets/123986919/3532a1a4-8843-4c67-b373-817ddc60699a)

