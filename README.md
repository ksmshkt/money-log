# Money Log

シンプルな家計簿アプリです。  
日々の支出を記録し、カテゴリ別の支出をグラフで確認できます。

---

## Overview

Money Log は日々の支出を簡単に記録・管理できる Web アプリケーションです。

- 月ごとの支出一覧表示
- カテゴリ別の支出管理
- 支出のグラフ可視化

個人開発として、バックエンドからフロントエンドまで一貫して実装しました。

---

## Features

- 支出の追加 / 編集 / 削除（CRUD）
- 月ごとの支出一覧表示
- カテゴリ別管理
- 円グラフによる支出可視化
- モーダルフォーム入力
- タブ切り替え（一覧 / 集計）

---

## Screenshots

### 支出一覧

月ごとの支出を一覧で表示します。

<img width="1327" height="778" alt="スクリーンショット 2026-03-19 8 18 08" src="https://github.com/user-attachments/assets/9d841ffc-19ec-4f12-b6f3-f807f01f3374" />

---

### カテゴリ別支出グラフ

支出をカテゴリごとに集計し、円グラフで表示します。

例

<img width="1360" height="780" alt="スクリーンショット 2026-03-19 8 34 06" src="https://github.com/user-attachments/assets/f43aa94c-9c98-4ad0-900a-523ae413821f" />


---

## Tech Stack

### Backend

- Java
- Spring Boot
- Spring MVC
- Thymeleaf
- JPA / Hibernate

### Frontend

- JavaScript (ES Modules)
- Chart.js
- HTML / CSS

### Database

- PostgreSQL

---

## Architecture

```
Controller
↓
Service
↓
Repository
↓
Database
```

フロントエンドは機能ごとに JavaScript モジュールを分割しています。

```
item.js
item-api.js
item-modal.js
item-validate.js
```

---

## Main Features Implementation

### 処理の流れ

1. モーダルフォーム表示
2. 入力バリデーション
3. API送信
4. テーブル更新
5. グラフ更新

---

## Getting Started

### Clone

```bash
git clone https://github.com/ksmshkt/money-log.git
cd money-log
```

### RUN

```bash
./mvnw spring-boot:run
```

### ブラウザでアクセス

```
http://localhost:8080
```

### AUTHOR

```
https://github.com/ksmshkt
```

## Database ER Diagram

```mermaid
erDiagram
    Item {
        Long id PK
        String name
        Integer cost
        LocalDate spentAt
        Long categoryId FK
    }

    Category {
        Long id PK
        String name
        String color
    }

    Item }o--|| Category : belongs_to
```
