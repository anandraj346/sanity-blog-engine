import { Settings } from "lucide-react";
import type { StructureBuilder } from "sanity/structure";

export const SettingsItem = (S: StructureBuilder) =>
  S.listItem()
    .title('Settings')
    .icon(Settings)
    .child(
      S.list()
        .title('Settings')
        .items([
          S.listItem()
            .title('General')
            .child(
              S.document()
              .id('generalSettings')
              .schemaType('generalSettings')
              .documentId('generalSettings')
              .title('General')
            ),
          S.listItem()
            .title('Navigation')
            .child(
              S.document()
                .id('navigationSettings')
                .schemaType('navigationSettings')
                .documentId('navigationSettings')
                .title('Navigation')
            ),
          S.divider(),
          S.listItem()
            .title('Blog & Posts')
            .child(
              S.document()
                .id('blogSettings')
                .schemaType('blogSettings')
                .documentId('blogSettings')
                .title('Blog & Posts')
            ),
        ])
    )