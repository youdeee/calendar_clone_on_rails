class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false, default: ""
      t.date :date, null: false
      t.string :place, null: false, default: ""
      t.text :description

      t.timestamps
    end
  end
end
