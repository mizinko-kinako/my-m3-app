# MyM3App

このプロジェクトは [Angular CLI](https://github.com/angular/angular-cli) version 20.3.4 を使用して生成されました。

## 開発サーバー

ローカル開発用サーバーを起動するには、次のコマンドを実行します:

```bash
ng serve
```

サーバーが起動したら、ブラウザで `http://localhost:4200/` を開いてください。ソースファイルを変更すると、アプリケーションは自動的にリロードされます。

## コードの自動生成

Angular CLIには、強力なコード自動生成ツールが含まれています。新しいコンポーネントを生成するには、次のコマンドを実行します:

```bash
ng generate component component-name
```

利用可能なschematics（`components`、`directives`、`pipes`など）の完全なリストについては、次のコマンドを実行してください:

```bash
ng generate --help
```

## ビルド

プロジェクトをビルドするには、次のコマンドを実行します:

```bash
ng build
```

これによりプロジェクトがコンパイルされ、ビルド成果物が `dist/` ディレクトリに格納されます。デフォルトでは、本番ビルドはパフォーマンスと速度のためにアプリケーションを最適化します。

## ユニットテストの実行

[Karma](https://karma-runner.github.io) テストランナーでユニットテストを実行するには、次のコマンドを使用します:

```bash
ng test
```

## E2Eテストの実行

エンドツーエンド（E2E）テストを実行するには、次のコマンドを実行します:

```bash
ng e2e
```

Angular CLIには、デフォルトでエンドツーエンドのテストフレームワークは付属していません。ニーズに合ったものを選択できます。

## その他のリソース

Angular CLIの使用に関する詳細情報（詳細なコマンドリファレンスを含む）については、[Angular CLIの概要とコマンドリファレンス](https://angular.dev/tools/cli)ページをご覧ください。

## Google Cloud Runへのデプロイ

このアプリケーションをGoogle Cloud Runでホストするための手順です。

1.  **アプリケーションのコンテナ化:**
    この目的のために`Dockerfile`がプロジェクトのルートに作成されています。

2.  **gcloud CLIのセットアップ:**
    まだインストールしていない場合は、[Google Cloud CLI](https://cloud.google.com/sdk/docs/install) をインストールし、お使いのGoogleアカウントでログインしてください (`gcloud auth login`)。
    次に、プロジェクトIDを設定します。
    ```bash
    gcloud config set project YOUR_PROJECT_ID
    ```
    `YOUR_PROJECT_ID` は実際のプロジェクトIDに置き換えてください。

3.  **必要なAPIを有効にする:**
    次のコマンドを実行して、Cloud Build, Artifact Registry, Cloud Run APIを有効にします。
    ```bash
    gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com
    ```

4.  **Artifact Registryリポジトリの作成:**
    コンテナイメージを保存するためのリポジトリを作成します。
    ```bash
    gcloud artifacts repositories create my-m3-app-repo --repository-format=docker --location=asia-northeast1 --description="My M3 App repository"
    ```
    （`asia-northeast1` はお好きなリージョンに変更可能です）

5.  **Cloud Buildでイメージをビルドしてプッシュ:**
    次のコマンドを実行すると、Cloud Buildが `Dockerfile` を使ってイメージをビルドし、作成したArtifact Registryリポジトリにプッシュします。
    ```bash
    gcloud builds submit --tag asia-northeast1-docker.pkg.dev/YOUR_PROJECT_ID/my-m3-app-repo/my-m3-app .
    ```
    `YOUR_PROJECT_ID` を忘れずに置き換えてください。

6.  **Cloud Runへのデプロイ:**
    最後に、ビルドしたイメージをCloud Runにデプロイします。
    ```bash
    gcloud run deploy my-m3-app-service --image=asia-northeast1-docker.pkg.dev/YOUR_PROJECT_ID/my-m3-app-repo/my-m3-app --platform=managed --region=asia-northeast1 --allow-unauthenticated
    ```
    `--allow-unauthenticated` フラグにより、誰でもアクセスできる公開サービスとしてデプロイされます。認証が必要な場合は、このフラグを外してください。