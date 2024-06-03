package com.example.springboot.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;
@Getter
@Setter
@NoArgsConstructor
@DynamoDBTable(tableName = "MelodyMap_result")
public class MelodyMap2 {
    @DynamoDBHashKey(attributeName = "result_choice")
    private String result_choice;

    @DynamoDBAttribute(attributeName = "count")
    private int count;


    @DynamoDBAttribute(attributeName = "music")
    private List<Map<String,String>> music;


    @DynamoDBAttribute(attributeName = "places")
    private List<Map<String,String>> places;

}