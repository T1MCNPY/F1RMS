package com.sti.gymmanagementsystem.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "screen_saver")
public class ScreenSaver {

    @Id
    private String id;

    private String imageUrl;
}
