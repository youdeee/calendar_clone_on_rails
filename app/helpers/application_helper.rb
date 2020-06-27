# frozen_string_literal: true

module ApplicationHelper
  def show_meta_tags
    if display_meta_tags.blank?
      key = "#{controller_path.tr('/', '.')}.#{action_name}.title"
      if I18n.exists? key
        assign_meta_tags(title: t(key))
      else
        assign_meta_tags
      end
    end
    display_meta_tags
  end

  def assign_meta_tags(options = {})
    defaults = {
      title:     t("common.site"),
      site:      t("common.site"),
      separator: ":",
      reverse:   true,
      canonical: request.original_url
    }
    options.reverse_merge!(defaults)
    set_meta_tags(options)
  end
end
