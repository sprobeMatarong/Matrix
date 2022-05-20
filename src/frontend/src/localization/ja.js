const ja = {
  translation: {
    // define translations below
    form: {
      required: 'この項目は必須です。',
      email: 'メール形式が無効です。',
      password: {
        minLength: 'パスワードは8文字以上である必要があります。',
        confirm: 'パスワードの確認が一致しません。',
        strong:
          'パスワードには、大文字1文字、特殊文字1文字、および少なくとも8文字が含まれている必要があります。',
      },
    },
    labels: {
      first_name: 'ファーストネーム',
      last_name: '苗字',
      login: 'ログイン',
      signup: 'サインアップ',
      remember_me: '私を覚えてますか',
      forgot_password: 'パスワードをお忘れですか？',
      email_address: '電子メールアドレス',
      password: 'パスワード',
      confirm_password: 'パスワードを認証する',
      submit: '送信',
      update: 'アップデート',
      save: '保存する',
      add_new: '新しく追加する',
      reset_password: 'パスワードを再設定する',
      new_password: '新しいパスワード',
      confirm_new_password: '新しいパスワードを確認',
      enter_keyword: 'キーワードを入力してください',
    },
    pages: {
      signup: {
        agree_to_terms: '[サインアップ]をクリックすると、読んだことに同意したことになります',
        terms_conditions: '規約と条件',
        create_free_account: '無料アカウントを作成する',
      },
      forgot_password: {
        sub_heading: 'アカウントを復旧するには、以下にメールアドレスを入力してください。',
        success: 'パスワードをリセットする方法については、受信トレイを確認してください。',
      },
      reset_password: {
        sub_heading: '新しいパスワードを入力してください。',
        success: 'パスワードは正常に更新されました。',
      },
      users: {
        user_created: 'ユーザーが作成されました。',
        user_updated: 'ユーザーの詳細が更新されました。',
        user_deleted: 'ユーザーが削除されました',
        add_user: 'ユーザーを追加する',
        edit_user: 'ユーザー編集',
        delete_user: 'ユーザーを削除',
        first_name: 'ファーストネーム',
        last_name: '苗字',
        email_address: '電子メールアドレス',
        status: '状態',
        delete_confirmation: '選択したユーザーを削除してもよろしいですか？',
      },
      activate: {
        heading: 'アカウントをアクティブ化',
        subtitle: 'アカウントをアクティブ化するためのパスワードを設定します。',
        activated: 'アカウントが有効になりました。 これで、アカウントにログインできます。',
      },
    },
    menu: {
      home: '家',
      about: '約',
      contact: 'コンタクト',
      faq: 'FAQ',
      dashboard: 'ダッシュボード',
      users: 'ユーザー',
      orders: '注文',
      reports: 'レポート',
      integrations: '統合',
      profile: 'プロフィール',
      logout: 'ログアウト',
    },
  },
};

export default ja;
