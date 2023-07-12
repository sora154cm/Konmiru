class User < ApplicationRecord
  # パスワードハッシュ化するメソッド
  has_secure_password 

  # ユーザー登録時に空白は許可しない
  validates :login_key, presence: true
  # has_secure_password メソッドにpresence: trueのバリデーションが含まれている
  # 空白でなかったら文字数以上の制限をかける
  validates :login_key, length: { minimum: 8 }, if: :login_key_present?
  validates :password, length: { minimum: 8 }, if: :password_present?

  private

  def login_key_present?
    login_key.present?
  end

  def password_present?
    password.present?
  end
end
