Angular Material (M3) 最新テーマ設定完全マニュアル (v20対応版)
このマニュアルは、Angular 20以上、Angular Material 20.2.7以上を使用し、**Material Design 3 (M3)**に基づいたテーマ設定を行うための、包括的かつ網羅的なガイドです。公式のSchematics（コード生成機能）を利用する、最も推奨されるベストプラクティスのみを記載しています。

# 1. はじめに
Angular MaterialのM3テーマは、より動的で表現力豊かなUIデザインを可能にします。このガイドは、公式のコードジェネレータを使い、マルチテーマ（ライト/ダーク、複数カラー）対応、タイポグラフィ、密度、そして独自コンポーネントへのテーマ適用までを網羅します。

# 2. 環境構築
最新のAngular開発環境を構築します。（このセクションは変更ありません）

## 2-1. 前提条件
Node.js の最新LTS版がインストールされていること。

## 2-2. Angular CLIのインストール
```bash
npm install -g @angular/cli
```

## 2-3. 新しいAngularプロジェクトの作成
```bash
ng new my-m3-app --style=scss --routing=true --standalone
```

作成後、プロジェクトディレクトリに移動します。

```bash
cd my-m3-app
```

## 2-4. Angular Materialの追加
```bash
ng add @angular/material
```

`ng add` 実行時の対話形式の質問には、これまでと同様に回答してください。

# 3. M3カスタムテーマの作成 (公式Schematics利用)
ここからが、公式に推奨される根本的な手順です。手動でファイルを作成するのではなく、ジェネレータにテーマの骨格を生成させます。

## 3-1. テーマファイルジェネレータの実行
以下のコマンドを実行し、対話形式でテーマを作成します。

```bash
ng generate @angular/material:theme-color
```

コマンドが完了すると、`src/_theme-colors.scss` というファイルが生成されます。このファイルには、指定した色に基づいたライトテーマとダークテーマの定義の元となるパレットがすでに含まれています。

## 3-2. マルチテーマへの拡張とタイポグラフィ設定
`_theme-colors.scss` で定義されたカラーパレットを使い、ライトテーマとダークテーマを定義します。同時に、アプリケーション全体のフォントを設定し、テーマを切り替える仕組みを実装します。

### 3-2-1. `index.html` でフォントを読み込む (任意)
カスタムフォントを使用する場合、`src/index.html` の `<head>` タグ内に、使用したいフォントのリンクを追加します。ここでは例として 'Noto Sans JP' を使用します。

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
```

### 3-2-2. `styles.scss` の編集
`src/styles.scss` を開き、以下の内容に書き換えます。
M3のテーマ設定では、`mat.theme` ミックスインの `typography` プロパティに直接フォント設定のマップを渡すことで、タイポグラフィをカスタマイズするのが最新の正しい方法です。

```scss
@use '@angular/material' as mat;
@use 'theme-colors' as theme;

@include mat.core();

// ライトテーマの定義と適用
html {
  @include mat.theme((
    color: (
      primary: theme.$primary-palette,
      tertiary: theme.$tertiary-palette
    ),
    typography: (
      // ここでフォントファミリーを直接指定
      'plain-family': '"Noto Sans JP", sans-serif'
    ),
    density: 0,
  ));
}

// .dark-theme クラスが適用された場合にダークテーマを適用
.dark-theme {
  @include mat.theme((
    color: (
      primary: theme.$primary-palette,
      tertiary: theme.$tertiary-palette,
      theme-type: dark
    ),
    typography: (
      'plain-family': '"Noto Sans JP", sans-serif'
    ),
  ));
}

body {
  color-scheme: light dark;
  background-color: var(--mat-sys-surface);
  color: var(--mat-sys-on-surface);
  // bodyのfont-familyも忘れずに更新
  font-family: '"Noto Sans JP", sans-serif';
  margin: 0;
}

html, body { height: 100%; }
```

### 3-2-3. テーマ切り替えUIの実装
`app.html` に、テーマを切り替えるためのスライドトグルを追加します。

```html
<mat-toolbar color="primary">
  <span>{{ title() }}</span>
  <span class="spacer"></span>
  <mat-slide-toggle [checked]="isDarkMode()" (change)="toggleTheme()">
    Dark Mode
  </mat-slide-toggle>
</mat-toolbar>

<mat-sidenav-container>
  <mat-sidenav #sidenav mode="side" opened>
    <mat-nav-list>
      <a mat-list-item routerLink="/">Material Examples</a>
    </mat-nav-list>
  </mat-sidenav>
  <mat-sidenav-content>
    <router-outlet></router-outlet>
  </mat-sidenav-content>
</mat-sidenav-container>
```

### 3-2-4. テーマ切り替えロジックの実装
`app.ts` に、テーマの状態を管理し、切り替えるためのロジックを追加します。

```typescript
import { Component, signal, effect, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('みじんこきなこ用Angular Materialサンプル');
  isDarkMode = signal(false);

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    // OSのテーマ設定を検知
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode.set(mediaQuery.matches);
    mediaQuery.addEventListener('change', (e) => this.isDarkMode.set(e.matches));

    // isDarkMode の変更を監視し、body要素に .dark-theme クラスを適用/削除
    effect(() => {
      if (this.isDarkMode()) {
        this.renderer.addClass(this.document.body, 'dark-theme');
      } else {
        this.renderer.removeClass(this.document.body, 'dark-theme');
      }
    });
  }

  toggleTheme(): void {
    this.isDarkMode.update(value => !value);
  }
}
```

# 4. 独自コンポーネントへのテーマ適用
`styles.scss`で定義したテーマを、独自コンポーネントに適用する方法です。

## 4-1. コンポーネント用のSCSSファイル
`my-custom.component.scss` のようなコンポーネント固有のスタイルファイルで、以下のようにテーマ変数を参照します。

```scss
.my-custom-component {
  // プライマリカラーを参照
  background-color: var(--mat-sys-primary);
  color: var(--mat-sys-on-primary);
  padding: 16px;
  border-radius: 4px;
}
```
M3では `mat.theme` を適用した時点でCSSカスタムプロパティが生成されるため、コンポーネントのscssファイル内で `@use '@angular/material' as mat;` を読み込む必要はありません。

これで、ライトテーマとダークテーマが切り替わると、`my-custom-component` の背景色と文字色も自動的に追従します。

# 5. まとめ
このガイドでは、Angular Material M3テーマを公式のSchematicsを使って設定し、マルチテーマ対応、そして独自コンポーネントへの適用までを行いました。この手順に従うことで、保守性が高く、Material Designの思想に沿った美しいアプリケーションを効率的に構築できます。