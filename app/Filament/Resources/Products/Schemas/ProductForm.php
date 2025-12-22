<?php

namespace App\Filament\Resources\Products\Schemas;

use App\Enums\ProductStatusEnum;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Builder;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->live(onBlur: true)
                    ->label('Product Name')
                    ->required()
                    ->afterStateUpdated(function (string $operation, $state, callable $set) {
                        $set('slug', Str::slug($state));
                    }),

                TextInput::make('slug')
                    ->label('Slug')
                    ->required(),

                Select::make('department_id')
                    ->label(__('Department'))
                    ->relationship('department', 'name')
                    ->preload()
                    ->searchable()
                    ->required()
                    ->reactive()
                    ->afterStateUpdated(fn(callable $set) => $set('category_id', null)), //reset category when department changes
                Select::make('category_id')
                    ->label(__('Category'))
                    ->relationship(
                        name: 'category',
                        titleAttribute: 'name',
                        modifyQueryUsing: function (Builder $query, callable $get) {
                            $departmentId = $get('department_id');
                            if ($departmentId) {
                                $query->where('department_id', $departmentId);
                            }
                        }

                    )
                    ->preload()
                    ->searchable()
                    ->required(),
                    RichEditor::make('description')
                        ->label('Description')
                        ->required()
                        ->toolbarButtons([
                            'bold',
                            'italic',
                            'underline',
                            'strike',
                            'bulletList',
                            'orderedList',
                            'link',
                            'codeBlock',
                            'blockquote',
                            'h2',
                            'h3',
                            'orderedList',
                            'redo',
                            'table',
                            'undo'
                        ])
                        ->columnSpan(2),
                        TextInput::make('price')
                            ->label('Price')
                            ->numeric()
                            ->required(),
                        TextInput::make('quantity')
                            ->label('Quantity')
                            ->integer(),
                         Select::make('status')
                         ->options(ProductStatusEnum::labels())
                         ->default(ProductStatusEnum::Draft->value)
                         ->required()
            ]);
    }
}
