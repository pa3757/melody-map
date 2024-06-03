package com.example.springboot.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@DynamoDBTable(tableName = "MelodyMap_comment")
public class MelodyMap_comment {

    @DynamoDBHashKey(attributeName = "comment_title")
    private String commentTitle;

    @DynamoDBAttribute(attributeName = "author")
    private String author;

    @DynamoDBAttribute(attributeName = "content")
    private String content;

    @DynamoDBAttribute(attributeName = "date")
    private String date;

    @DynamoDBAttribute(attributeName = "imageUrls")
    private List<String> imageUrls;


}
